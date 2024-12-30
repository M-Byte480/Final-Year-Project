/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.controllers;

import milan.backend.service.SiteComposerService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@Controller("/api/composer")
public class SiteComposerController {

    private final SiteComposerService composerService;

    public SiteComposerController(SiteComposerService composerService) {
        this.composerService = composerService;
    }

    @PostMapping("/save/{id}")
    public void saveState(@RequestBody Map<String, String> payload,
                          @PathVariable String id) {


    }

    @GetMapping("/get-save/{id}")
    public void getState() {

    }
}
