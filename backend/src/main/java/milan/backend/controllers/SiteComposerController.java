/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import milan.backend.entity.FooterEntity;
import milan.backend.entity.NavbarMapperEntity;
import milan.backend.entity.site.PageEntity;
import milan.backend.exception.AlreadyExistsException;
import milan.backend.model.dto.ComposerDashboardDTO;
import milan.backend.model.dto.FooterStateDTO;
import milan.backend.model.dto.NavbarMapperDTO;
import milan.backend.service.JwtService;
import milan.backend.service.SiteComposerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/composer")
public class SiteComposerController {

    private final SiteComposerService composerService;
    private final JwtService jwtService;
    private ObjectMapper objectMapper;


    @PostMapping("/save")
    public void saveState(@RequestBody ComposerDashboardDTO payload,
                          @RequestHeader("Authorization") String jwtToken) {


    }

    @GetMapping("/get")
    public ResponseEntity<Object> getState(@RequestParam("siteId") String siteId,
                                           @RequestParam("pageIde") String pageId){
        UUID siteUUID = UUID.fromString(siteId);
        UUID pageUUID = UUID.fromString(pageId);

        JsonNode state = composerService.getState(siteUUID, pageUUID);
        return ResponseEntity.ok(state);
    }

    @GetMapping("/footer")
    public ResponseEntity<Object> getFooter(@RequestParam("siteId") String siteId) {

        FooterEntity footerEntity = composerService.getFooter(siteId);

        return ResponseEntity.ok(footerEntity.getFooterState());
    }

    @PostMapping("/footer")
    public ResponseEntity<Object> setFooter(@RequestBody FooterStateDTO saveFooterDTO) {
        UUID siteUUID = UUID.fromString(saveFooterDTO.getSiteId());

        JsonNode state = saveFooterDTO.getState();
        this.composerService.setFooter(siteUUID, state);

        return ResponseEntity.ok(null);
    }

    @GetMapping("/navbar-mapping")
    public ResponseEntity<Object> getNavBarMapping(@RequestParam("siteId") String siteId) {
        NavbarMapperEntity navBarMappingEntity = this.composerService.getNavBarMapping(siteId);
        return ResponseEntity.ok(navBarMappingEntity.getNavbarMappingState());
    }

    @PostMapping("/set-navbar")
    public ResponseEntity<Object> saveNavBarMapping(@RequestBody NavbarMapperDTO navbarDTO) throws Exception {
        UUID siteUUID = UUID.fromString(navbarDTO.getSiteId());
        JsonNode jsonNode = navbarDTO.getData();
        this.composerService.setNavBarMapping(siteUUID, jsonNode);
        return ResponseEntity.ok(null);
    }


    @PostMapping("/add-site")
    public ResponseEntity<ComposerDashboardDTO> addSite(@RequestBody ComposerDashboardDTO payload) throws AlreadyExistsException {
        String nameOfComposer = payload.getPageName();
        String siteId = payload.getParentSiteId();
        PageEntity pageEntity = composerService.addSite(nameOfComposer, siteId);
        return ResponseEntity.ok(new ComposerDashboardDTO(pageEntity.getId().toString(), pageEntity.getPageName()));
    }

    @PostMapping("/delete-site")
    public void deleteSite(@RequestBody ComposerDashboardDTO payload,
                           @RequestHeader("Authorization") String jwtToken) {

    }

    @GetMapping("/get-save")
    public void getState(@RequestHeader("Authorization") String jwtToken,
                         @RequestBody ComposerDashboardDTO payload) {

    }

    @GetMapping("/get-sites")
    public ResponseEntity<Set<PageEntity>> getSites(@RequestParam("pageId") String pageIdAsString) {
        UUID pageId = UUID.fromString(pageIdAsString);
        Set<PageEntity> sites = composerService.getComposerPages(pageId);
        return ResponseEntity.ok(sites);
    }
}
