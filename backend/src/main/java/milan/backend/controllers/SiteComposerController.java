/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.controllers;

import lombok.AllArgsConstructor;
import milan.backend.entity.site.PageEntity;
import milan.backend.exception.AlreadyExistsException;
import milan.backend.model.dto.ComposerDashboardDTO;
import milan.backend.service.JwtService;
import milan.backend.service.SiteComposerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/composer")
public class SiteComposerController {

    private final SiteComposerService composerService;
    private final JwtService jwtService;


    @PostMapping("/save")
    public void saveState(@RequestBody ComposerDashboardDTO payload,
                          @RequestHeader("Authorization") String jwtToken) {


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
    public void getSites(@RequestHeader("Authorization") String jwtToken) {
        String userId = jwtToken.substring(7);
    }
}
