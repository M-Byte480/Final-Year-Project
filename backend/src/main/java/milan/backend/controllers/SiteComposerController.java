/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.controllers;

import milan.backend.model.dto.ComposerDashboardDTO;
import milan.backend.service.SiteComposerService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Controller("/api/composer")
public class SiteComposerController {

    private final SiteComposerService composerService;

    public SiteComposerController(SiteComposerService composerService) {
        this.composerService = composerService;
    }

    @PostMapping("/save")
    public void saveState(@RequestBody ComposerDashboardDTO payload,
                          @RequestHeader("Authorization") String jwtToken) {


    }

    @PostMapping("/add-site")
    public ComposerDashboardDTO addSite(@RequestBody ComposerDashboardDTO payload,
                        @RequestHeader("Authorization") String jwtToken) {

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
    public void getSites(@RequestHeader("Authorization") String jwtToken){
        String userId = jwtToken.substring(7);
    }
}
