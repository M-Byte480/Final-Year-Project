/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.service;

import milan.backend.entity.site.PageEntity;
import milan.backend.repository.PageRepository;
import milan.backend.repository.SiteRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SiteComposerService {
    private PageRepository pageRepository;
    private SiteRepository siteRepository;
    public SiteComposerService(PageRepository pageRepository,
                               SiteRepository siteRepository) {
        this.pageRepository = pageRepository;
        this.siteRepository = siteRepository;
    }

    public PageEntity addSite(String nameOfComposer, String siteId){
        UUID parentSiteUUID = UUID.fromString(siteId);
        UUID pageUUID = UUID.randomUUID();

        PageEntity pageEntity = new PageEntity();
        pageEntity.setId(pageUUID);
        pageEntity.setSiteId(parentSiteUUID);
        pageEntity.setPageName(nameOfComposer);

        return pageRepository.save(pageEntity);
    }
}
