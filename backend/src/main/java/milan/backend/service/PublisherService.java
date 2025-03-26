package milan.backend.service;

import lombok.AllArgsConstructor;
import milan.backend.entity.ComposerPageEntity;
import milan.backend.entity.FooterEntity;
import milan.backend.entity.NavbarMapperEntity;
import milan.backend.entity.PublishedPageEntity;
import milan.backend.entity.PublishedSiteEntity;
import milan.backend.entity.id.classes.PublishedSiteIdTimestamp;
import milan.backend.entity.id.classes.SiteIdPageIdCompositeKey;
import milan.backend.model.PublishedSiteDTO;
import milan.backend.model.dto.DeployDTO;
import milan.backend.repository.IsSiteDeployedRepository;
import milan.backend.repository.PublishedPagesRepository;
import milan.backend.repository.PublishedRepository;
import milan.backend.repository.SubdomainRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
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
    private final SubdomainRepository subdomainRepository;

    // todo: sort this out for controller
    public PublishedSiteEntity getLatestSiteEntityForSiteId(UUID siteId){
        List<PublishedSiteEntity> publishedSiteHistory = this.publishRepository.findAllById_SiteIdOrderById_PublishTimestamp(siteId);
        return publishedSiteHistory.getLast();
    }

    public List<PublishedSiteEntity> getAllPublishedSitesForSiteId(UUID siteId){
        return this.publishRepository.findAllById_SiteId(siteId);
    }

    public PublishedSiteEntity publish(DeployDTO deployDTO){
        UUID siteId = UUID.fromString(deployDTO.getSiteId());
        List<ComposerPageEntity> composerPages = this.getComposerPagesForSiteId(siteId);
        NavbarMapperEntity navbarMapperEntity = this.siteComposerService.getNavBarMapping(siteId);
        FooterEntity footerEntity = this.siteComposerService.getFooter(siteId);

        for (ComposerPageEntity composerPage : composerPages) {
            String name = this.siteComposerService.getNameForPage(composerPage.getSiteIdPageIdCompositeKey().getPageId());
            PublishedPageEntity publishedPageEntity = new PublishedPageEntity();
            SiteIdPageIdCompositeKey key = new SiteIdPageIdCompositeKey(siteId, composerPage.getSiteIdPageIdCompositeKey().getPageId());
            publishedPageEntity.setId(key);
            publishedPageEntity.setPublishedState(composerPage.getSavedState());
            publishedPageEntity.setPageName(name);
            this.pagesRepository.save(publishedPageEntity);
        }

        PublishedSiteEntity publishedSiteEntity = new PublishedSiteEntity();
        PublishedSiteIdTimestamp id = new PublishedSiteIdTimestamp();
        id.setSiteId(siteId);
        id.setPublishTimestamp(Instant.now());
        publishedSiteEntity.setId(id);
        publishedSiteEntity.setNavBar(navbarMapperEntity.getNavbarMappingState());
        publishedSiteEntity.setFooter(footerEntity.getFooterState());
        return this.publishRepository.save(publishedSiteEntity);
    }

    public PublishedPageEntity getSiteEntityFromSiteIdAndName(UUID siteId, String pageName){
        return this.pagesRepository.findById_SiteIdAndPageName(siteId, pageName).orElseGet(
                PublishedPageEntity::new
        );
    }

    private List<ComposerPageEntity> getComposerPagesForSiteId(UUID siteId){
        List<UUID> pageIds = this.siteComposerService.getPagesForSite(siteId);
        List<ComposerPageEntity> composerPageEntities = new ArrayList<>();
        for (UUID pageId : pageIds) {
            composerPageEntities.add(this.siteComposerService.getComposerStateForPage(siteId, pageId));
        }
        return composerPageEntities;
    }

    public PublishedSiteDTO getSiteFromRouteAndName(String subdomain, String pageName) {
        UUID siteId = this.getSiteIdFromSubdomain(subdomain);
        PublishedPageEntity publishedPageEntity = this.getSiteEntityFromSiteIdAndName(siteId, pageName);
        PublishedSiteDTO publishedSiteDTO = new PublishedSiteDTO();
        publishedSiteDTO.setBody(publishedPageEntity.getPublishedState());
        PublishedSiteEntity publishedSite = this.getLatestSiteEntityForSiteId(siteId);
        publishedSiteDTO.setFooter(publishedSite.getFooter());
        publishedSiteDTO.setNavbar(publishedSite.getNavBar());

        return publishedSiteDTO;
    }

    public UUID getSiteIdFromSubdomain(String subdomain) {
        return this.subdomainRepository.findBySubdomain(subdomain).orElseThrow().getSiteId();
    }
}
