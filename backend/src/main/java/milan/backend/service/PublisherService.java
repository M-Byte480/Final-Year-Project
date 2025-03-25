package milan.backend.service;

import lombok.AllArgsConstructor;
import milan.backend.entity.ComposerPageEntity;
import milan.backend.entity.FooterEntity;
import milan.backend.entity.NavbarMapperEntity;
import milan.backend.entity.PublishedPageEntity;
import milan.backend.entity.PublishedSiteEntity;
import milan.backend.entity.id.classes.SiteIdPageIdCompositeKey;
import milan.backend.model.dto.DeployDTO;
import milan.backend.repository.IsSiteDeployedRepository;
import milan.backend.repository.PublishedPagesRepository;
import milan.backend.repository.PublishedRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PublisherService {
    private final PublishedRepository publishRepository;
    private final PublishedPagesRepository pagesRepository;
    private final SiteComposerService siteComposerService;
    private final IsSiteDeployedRepository isSiteDeployedRepository;

    // todo: sort this out for controller
    public PublishedSiteEntity getSiteEntityForSiteID(UUID siteId){
        List<PublishedSiteEntity> publishedSiteHistory = this.publishRepository.findAllById_SiteId(siteId);
        return null;
    }

    // TODO: Create an entry by copying the current site entity
    // TODO: Create an entry to isDeployedENTITY;
    public void publish(DeployDTO deployDTO){
        UUID siteId = UUID.fromString(deployDTO.getSiteId());
        List<ComposerPageEntity> composerPages = this.getComposerPagesForSiteId(siteId);
        NavbarMapperEntity navbarMapperEntity = this.siteComposerService.getNavBarMapping(siteId);
        FooterEntity footerEntity = this.siteComposerService.getFooter(siteId);

        PublishedSiteEntity publishedSiteEntity = new PublishedSiteEntity();
        for (ComposerPageEntity composerPage : composerPages) {
            PublishedPageEntity publishedPageEntity = new PublishedPageEntity();
            SiteIdPageIdCompositeKey key = new SiteIdPageIdCompositeKey(siteId, composerPage.getSiteIdPageIdCompositeKey().getPageId());
            publishedPageEntity.setId(key);
//            String pageName = this.
//            publishedPageEntity.setPageName(composerPage.getPageName());
//            publishedPageEntity.setPageState(composerPage.getSavedState());
//            this.pagesRepository.save(publishedPageEntity);
        }


    }

    public PublishedPageEntity getSiteEntityFromSiteIdAndName(UUID siteId, String pageName){
        return this.pagesRepository.findById_SiteIdAndPageName(siteId, pageName).orElseThrow();
    }

    private List<ComposerPageEntity> getComposerPagesForSiteId(UUID siteId){
        List<UUID> pageIds = this.siteComposerService.getPagesForSite(siteId);
        List<ComposerPageEntity> composerPageEntities = new ArrayList<>();
        for (UUID pageId : pageIds) {
            composerPageEntities.add(this.siteComposerService.getComposerStateForPage(siteId, pageId));
        }
        return composerPageEntities;
    }
}
