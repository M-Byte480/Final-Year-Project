package milan.backend.service;

import lombok.AllArgsConstructor;
import milan.backend.entity.PublishedPageEntity;
import milan.backend.entity.SubdomainEntity;
import milan.backend.model.dto.DeployDTO;
import milan.backend.repository.SubdomainRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class SubdomainService {

    private SubdomainRepository subdomainRepository;
    private SiteComposerService siteComposerService;
    private PublisherService publisherService;

    public DeployDTO tryDeploy(DeployDTO deployDTO) {
        this.siteComposerService.populateContent(deployDTO);

        this.publisherService.publish(deployDTO);
        // todo: set state to true

        return null;
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
}
