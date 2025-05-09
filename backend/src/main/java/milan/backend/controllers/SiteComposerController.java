/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import milan.backend.entity.FooterEntity;
import milan.backend.entity.ImageEntity;
import milan.backend.entity.NavbarMapperEntity;
import milan.backend.entity.site.PageEntity;
import milan.backend.exception.AlreadyExistsException;
import milan.backend.model.ImageUploadDTO;
import milan.backend.model.dto.ComposerDashboardDTO;
import milan.backend.model.dto.ComposerSavePageDTO;
import milan.backend.model.dto.DeleteDTO;
import milan.backend.model.dto.DeleteSiteDTO;
import milan.backend.model.dto.FooterStateDTO;
import milan.backend.model.dto.NavbarMapperDTO;
import milan.backend.service.ImageService;
import milan.backend.service.JwtService;
import milan.backend.service.SiteComposerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/composer")
public class SiteComposerController {

    private final SiteComposerService composerService;
    private final ImageService imageService;
    private final JwtService jwtService;
    private ObjectMapper objectMapper;


    @PostMapping("/save")
    public void saveState(@RequestBody ComposerSavePageDTO payload) {
        UUID siteUUID = UUID.fromString(payload.getSiteId());
        UUID pageUUID = UUID.fromString(payload.getPageId());
        JsonNode state = payload.getState();
        composerService.saveState(siteUUID, pageUUID, state);
    }

    @GetMapping("/get")
    public ResponseEntity<Object> getState(@RequestParam("siteId") String siteId,
                                           @RequestParam("pageId") String pageId){
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
    public void deleteSite(@RequestBody DeleteSiteDTO payload,
                           @RequestHeader("Authorization") String jwtToken) {
        boolean acceptConsequences = payload.isAcceptConsequences();
        if(!acceptConsequences) {
            throw new RuntimeException("User did not accept consequences");
        }
        UUID userId = UUID.fromString(this.jwtService.extractUsername(jwtToken.substring(7)));
        UUID siteId = UUID.fromString(payload.getSiteId());
        this.composerService.deleteSite(siteId, userId);
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

    @PostMapping("/upload") // hot fix for the implementation I have
    public ResponseEntity<ImageEntity> uploadImage(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "siteId", required = false) String siteId,
            @RequestParam(value = "pageId", required = false) String pageId,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "forNavBar", required = false) boolean forNavBar){
        ImageUploadDTO imageDTO = new ImageUploadDTO();
        imageDTO.setSiteId(siteId);
        imageDTO.setPageId(pageId);
        imageDTO.setImageUrl(imageUrl);
        imageDTO.setForNavBar(forNavBar);

        if (image != null) {
            try {
                imageDTO.setImage(image.getBytes());
                System.out.println("Received image bytes with length: " + image.getBytes().length);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }else{
            System.out.println("No image bytes received");
        }

        ImageEntity response;
        if(imageDTO.isForNavBar()){
            response = this.imageService.addImageForNavbar(imageDTO);
        }else{
            response = this.imageService.addImageForPage(imageDTO);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/delete")
    public ResponseEntity<Set<PageEntity>> delete(@RequestBody DeleteDTO deleteDTO){
        UUID pageId = UUID.fromString(deleteDTO.getPageId());
        UUID siteId = UUID.fromString(deleteDTO.getSiteId());
        this.composerService.deletePage(pageId, siteId);
        Set<PageEntity> sites = composerService.getComposerPages(siteId);
        return ResponseEntity.ok(sites);
    }
}
