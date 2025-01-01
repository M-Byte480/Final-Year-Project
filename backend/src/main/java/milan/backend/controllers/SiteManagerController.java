/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.controllers;

import milan.backend.model.dto.SiteDTO;
import milan.backend.service.SiteManagerService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/manager")
public class SiteManagerController {
    private final SiteManagerService managerService;

    public SiteManagerController(SiteManagerService managerService) {
        this.managerService = managerService;
    }

    // todo: convert this to use the jwt
    @PostMapping("/sites")
    public ResponseEntity<String> addSite(@RequestBody String userId){
        UUID userUuid = UUID.fromString(userId);
        managerService.addSite(userUuid);
        return ResponseEntity.ok("Site added");
    }

    // todo: convert this to use the jwt
    @GetMapping("/sites")
    public Set<SiteDTO> getSites(@RequestBody String userId) {
        return managerService.getSites(userId);
    }
    
}
