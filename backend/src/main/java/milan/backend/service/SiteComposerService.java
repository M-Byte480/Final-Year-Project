/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import milan.backend.entity.FooterEntity;
import milan.backend.entity.site.PageEntity;
import milan.backend.exception.AlreadyExistsException;
import milan.backend.repository.FooterRepository;
import milan.backend.repository.PageRepository;
import milan.backend.repository.SiteRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SiteComposerService {
    private PageRepository pageRepository;
    private SiteRepository siteRepository;
    private FooterRepository footerRepository;

    public PageEntity addSite(String nameOfComposer, String siteId) throws AlreadyExistsException {
        if (doesPageNameExists(nameOfComposer)){
            throw new AlreadyExistsException("AlreadyExists.COMPOSER_NAME.toString()", "Composer with name " + nameOfComposer + " already exists");
        }

        UUID parentSiteUUID = UUID.fromString(siteId);
        UUID pageUUID = UUID.randomUUID();

        PageEntity pageEntity = new PageEntity();
        pageEntity.setId(pageUUID);
        pageEntity.setSiteId(parentSiteUUID);
        pageEntity.setPageName(nameOfComposer);

        return pageRepository.save(pageEntity);
    }

    public FooterEntity getFooter(String siteId){
        UUID siteUUID = UUID.fromString(siteId);
        FooterEntity footerEntity =  footerRepository.findById(siteUUID).orElse(null);

        if (footerEntity == null){
            footerEntity = new FooterEntity();
            footerEntity.setSiteId(siteUUID);
            footerEntity.setFooterState(null);
            footerEntity.setUpdatedTimestamp(Instant.now());
            footerRepository.save(footerEntity);
        }

        return footerEntity;
    }

    public FooterEntity setFooter(UUID siteId, JsonNode state){
        FooterEntity footerEntity = new FooterEntity();
        footerEntity.setSiteId(siteId);
        footerEntity.setFooterState(state);
        footerEntity.setUpdatedTimestamp(Instant.now());
        return this.footerRepository.save(footerEntity);
    }

    public Set<PageEntity> getComposerPages(UUID siteId){
        return pageRepository.findAllBySiteId(siteId);
    }

    private boolean doesPageNameExists(String pageName){
        return pageRepository.existsByPageName(pageName);
    }
}
