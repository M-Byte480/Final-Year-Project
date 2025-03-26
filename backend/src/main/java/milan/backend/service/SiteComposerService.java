/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import milan.backend.entity.ComposerPageEntity;
import milan.backend.entity.FooterEntity;
import milan.backend.entity.NavbarMapperEntity;
import milan.backend.entity.id.classes.SiteIdPageIdCompositeKey;
import milan.backend.entity.site.PageEntity;
import milan.backend.exception.AlreadyExistsException;
import milan.backend.model.dto.DeployDTO;
import milan.backend.repository.ComposerSavedStateRepository;
import milan.backend.repository.FooterRepository;
import milan.backend.repository.NavbarMappingRepository;
import milan.backend.repository.PageRepository;
import milan.backend.repository.SiteRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SiteComposerService {
    private PageRepository pageRepository;
    private SiteRepository siteRepository;
    private ComposerSavedStateRepository composerPageRepository;
    private FooterRepository footerRepository;
    private NavbarMappingRepository navbarMappingRepository;


    public JsonNode getState(UUID siteId, UUID pageId) {
        SiteIdPageIdCompositeKey key = new SiteIdPageIdCompositeKey();
        key.setSiteId(siteId);
        key.setPageId(pageId);
        return this.composerPageRepository.findBySiteIdPageIdCompositeKey(key).orElseGet(
                () -> {
                    JsonNode emptyNode = new ObjectMapper().createObjectNode();
                    return this.composerPageRepository.save(new ComposerPageEntity(key, emptyNode, Instant.now()));
                }
        ).getSavedState();
    }

    public void populateContent(DeployDTO deployDTO){
        String siteId = deployDTO.getSiteId();
        UUID siteUUID = UUID.fromString(siteId);

        FooterEntity footerEntity = this.getFooter(siteUUID);
        NavbarMapperEntity navbarMapperEntity = this.getNavBarMapping(siteUUID);
        List<UUID> pageIds = this.pageRepository.getAllPageIds(siteUUID);

        deployDTO.setFooter(footerEntity.getFooterState());
        deployDTO.setNavbar(navbarMapperEntity.getNavbarMappingState());
        deployDTO.setPageIds(pageIds);

    }

    public PageEntity addSite(String nameOfComposer, String siteId) throws AlreadyExistsException {
        if (doesPageNameExists(nameOfComposer, siteId)){
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

    private boolean doesPageNameExists(String pageName, String siteId){
        return pageRepository.existsByPageNameAndSiteId(pageName, UUID.fromString(siteId));
    }

    // Todo: handle first time call, and also handle the case when the navbar mapping is not present
    // todo: then with subsequent calls, we can just pull the state. Delegate responsibility to the service class
    public NavbarMapperEntity getNavBarMapping(String siteId) {
        UUID siteUUID = UUID.fromString(siteId);
        NavbarMapperEntity navbarMapperEntity = this.navbarMappingRepository.findById(siteUUID).orElseGet(() -> {
            Set<PageEntity> pages = this.getComposerPages(siteUUID);
            NavbarMapperEntity newNavbarMapperEntity = new NavbarMapperEntity();
            newNavbarMapperEntity.setSiteId(siteUUID);
            newNavbarMapperEntity.setUpdatedTimestamp(Instant.now());

            /* this is going to get ugly. I need a jsonNode with the following attributes:
                {
                    routes: [
                      {
                        displayName: 'Home',
                        pageName: 'Home'
                      },
                    ],
                    logo: '',
                    brandName: 'Your Brand!',
                  }
                  We are going to assume that each page name is unique. There is no checks rn
             */


            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode jsonNode = objectMapper.createObjectNode();
            ArrayNode routesArray = objectMapper.createArrayNode();

            pages.forEach((page) -> {
                ObjectNode routeNode = objectMapper.createObjectNode();
                routeNode.put("displayName", page.getPageName());
                routeNode.put("pageName", page.getPageName());
                routesArray.add(routeNode);
            });

            jsonNode.set("routes", routesArray);
            jsonNode.put("logo", "");
            jsonNode.put("brandName", "Your Brand!");

            newNavbarMapperEntity.setNavbarMappingState(jsonNode);

            return this.navbarMappingRepository.save(newNavbarMapperEntity);
        });
        return navbarMapperEntity;
    }

    public NavbarMapperEntity setNavBarMapping(UUID siteUUID, JsonNode jsonNode) {
        NavbarMapperEntity navbarMapperEntity = new NavbarMapperEntity();
        navbarMapperEntity.setSiteId(siteUUID);
        navbarMapperEntity.setNavbarMappingState(jsonNode);
        navbarMapperEntity.setUpdatedTimestamp(Instant.now());
        return this.navbarMappingRepository.save(navbarMapperEntity);
    }

    public FooterEntity getFooter(UUID siteId){
        return this.getFooter(siteId.toString());
    }

    public NavbarMapperEntity getNavBarMapping(UUID siteId){
        return this.getNavBarMapping(siteId.toString());
    }

    public void saveState(UUID siteUUID, UUID pageUUID, JsonNode state) {
        SiteIdPageIdCompositeKey key = new SiteIdPageIdCompositeKey();
        key.setSiteId(siteUUID);
        key.setPageId(pageUUID);
        ComposerPageEntity composerPageEntity = new ComposerPageEntity(key, state, Instant.now());
        this.composerPageRepository.save(composerPageEntity);
    }

    public List<UUID> getPagesForSite(UUID siteId) {
        return this.pageRepository.getAllPageIds(siteId);
    }

    public ComposerPageEntity getComposerStateForPage(UUID siteId, UUID pageId) {
        return this.composerPageRepository.findBySiteIdPageIdCompositeKey(new SiteIdPageIdCompositeKey(siteId, pageId)).get();
    }

    public String getNameForPage(UUID pageId) {
        return this.pageRepository.findById(pageId).get().getPageName();
    }


//    public NavBarEntity getNavBar(String siteId) {
//        return null;
//    }
}
