package milan.backend.service;

import lombok.AllArgsConstructor;
import milan.backend.entity.PublishedSiteEntity;
import milan.backend.model.dto.DeployDTO;
import milan.backend.repository.PublishedPagesRepository;
import milan.backend.repository.PublishedRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PublisherService {
    private final PublishedRepository publishRepository;
    private final PublishedPagesRepository pagesRepository;
    private final SiteComposerService siteComposerService;

    // todo: sort this out for controller
    public PublishedSiteEntity getSiteEntityForSiteID(UUID siteId){
        List<PublishedSiteEntity> publishedSiteHistory = this.publishRepository.findAllById_SiteId(siteId);
        return null;
    }

    // TODO: Create an entry by copying the current site entity
    // TODO: Create an entry to isDeployedENTITY;
    public void publish(DeployDTO deployDTO){
        List<UUID> pagesToPublish = deployDTO.getPageIds();
        for (UUID pageId : pagesToPublish) {
//            this.siteComposerService.getComposerStateForPage(pageId);
        }
    }
}
