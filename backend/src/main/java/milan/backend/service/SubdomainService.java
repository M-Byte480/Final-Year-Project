package milan.backend.service;

import lombok.AllArgsConstructor;
import milan.backend.entity.PublishedPageEntity;
import milan.backend.entity.PublishedSiteEntity;
import milan.backend.entity.SubdomainEntity;
import milan.backend.entity.id.classes.PublishedSiteIdTimestamp;
import milan.backend.exception.SubRouteAlreadyInUse;
import milan.backend.model.dto.DeployDTO;
import milan.backend.repository.SubdomainRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SubdomainService {

    private SubdomainRepository subdomainRepository;
    private SiteComposerService siteComposerService;
    private PublisherService publisherService;

    public PublishedSiteEntity tryDeploy(DeployDTO deployDTO) {
        this.siteComposerService.populateContent(deployDTO);

        PublishedSiteEntity publishedSiteEntity = this.publisherService.publish(deployDTO);

        this.subdomainRepository.findBySiteId(publishedSiteEntity.getId().getSiteId()).ifPresentOrElse(
                subdomainEntity -> {
                    subdomainEntity.setDeployed(true);
                    this.subdomainRepository.save(subdomainEntity);
                },
                () -> {
                    SubdomainEntity newSubdomain = new SubdomainEntity();
                    newSubdomain.setSiteId(publishedSiteEntity.getId().getSiteId());
                    newSubdomain.setDeployed(true);
                    this.subdomainRepository.save(newSubdomain);
                }
        );

        return publishedSiteEntity;
    }

    public PublishedSiteEntity abortDeploy(UUID siteId) {
        this.subdomainRepository.findBySiteId(siteId).ifPresent(subdomainEntity -> {
            subdomainEntity.setDeployed(false);
            this.subdomainRepository.save(subdomainEntity);
        });
        return this.publisherService.getLatestSiteEntityForSiteId(siteId);
    }

    public PublishedPageEntity getSiteFromRouteAndName(String route, String name) {
        return this.getSiteWithRouteAndName(route, name);
    }

    public SubdomainEntity setSubdomain(UUID siteId, String subdomain) {
        checkIfSubdomainNameIsTaken(siteId, subdomain);

        SubdomainEntity subdomainEntity = this.subdomainRepository.findBySiteId(siteId).orElseGet(
                () -> {
                    SubdomainEntity newSubdomainEntity = new SubdomainEntity();
                    newSubdomainEntity.setSiteId(siteId);
                    newSubdomainEntity.setSubdomain(subdomain);
                    newSubdomainEntity.setDeployed(false);
                    return this.subdomainRepository.save(newSubdomainEntity);
                }
        );

        subdomainEntity.setSubdomain(subdomain);
        return this.subdomainRepository.save(subdomainEntity);
    }

    public void checkIfSubdomainNameIsTaken(UUID siteId, String subdomain){
        this.subdomainRepository.findBySubdomain(subdomain).ifPresent(subdomainEntity -> {
            if (!subdomainEntity.getSiteId().equals(siteId)) {
                throw new SubRouteAlreadyInUse("Sub-route already in use");
            }
        });
    }

    public String getSubdomain(UUID siteId) {
        SubdomainEntity subdomainEntity = this.subdomainRepository.findBySiteId(siteId).orElseGet(
                () -> {
                    SubdomainEntity newSubdomainEntity = new SubdomainEntity();
                    newSubdomainEntity.setSiteId(siteId);
                    newSubdomainEntity.setSubdomain("");
                    newSubdomainEntity.setDeployed(false);
                    return this.subdomainRepository.save(newSubdomainEntity);
                }
        );
        return subdomainEntity.getSubdomain();
    }

    private PublishedPageEntity getSiteWithRouteAndName(String route, String name) {
        UUID siteId = this.subdomainRepository.findBySubdomain(route).orElseThrow().getSiteId();
        return this.publisherService.getSiteEntityFromSiteIdAndName(siteId, name);
    }

    public List<PublishedSiteEntity> getHistory(String siteId) {
        UUID siteIdUUID = UUID.fromString(siteId);
        return this.publisherService.getAllPublishedSitesForSiteId(siteIdUUID);
    }

    public boolean isDeployed(PublishedSiteIdTimestamp key) {
        return this.subdomainRepository.findBySiteId(key.getSiteId()).map(SubdomainEntity::isDeployed).orElse(false);
    }

    public void checkIfRouteIsDeployed(String subRoute) {
        SubdomainEntity subdomainEntity = this.subdomainRepository.findBySubdomain(subRoute).orElseThrow();
        if (!subdomainEntity.isDeployed()) {
            throw new RuntimeException("Route is not deployed");
        }
    }
}
