package milan.backend.service;

import lombok.AllArgsConstructor;
import milan.backend.entity.PublishedPageEntity;
import milan.backend.entity.PublishedSiteEntity;
import milan.backend.entity.SubdomainEntity;
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

        return publishedSiteEntity;
    }

    public PublishedPageEntity getSiteFromRouteAndName(String route, String name) {
        return this.getSiteWithRouteAndName(route, name);
    }

    public SubdomainEntity setSubdomain(UUID siteId, String subdomain) {
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


}
