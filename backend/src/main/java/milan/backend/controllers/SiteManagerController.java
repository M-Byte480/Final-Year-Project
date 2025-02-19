/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.controllers;

import milan.backend.entity.site.SiteManagerEntity;
import milan.backend.model.dto.NewSiteDTO;
import milan.backend.model.dto.SiteDTO;
import milan.backend.service.JwtService;
import milan.backend.service.SiteManagerService;
import org.springframework.http.ResponseEntity;
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
    private final JwtService jwtService;

    public SiteManagerController(SiteManagerService managerService,
                                 JwtService jwtService) {
        this.managerService = managerService;
        this.jwtService = jwtService;
    }

    // todo: convert this to use the jwt
    @PostMapping("/sites")
    public ResponseEntity<SiteManagerEntity> addSite(@RequestHeader("Authorization") String jwtToken, @RequestBody NewSiteDTO dto) {
        String userId = this.jwtService.extractUsername(jwtToken.substring(7));
        UUID userUuid = UUID.fromString(userId);
        SiteManagerEntity returnObject = managerService.addSite(userUuid, dto.getName());
        return ResponseEntity.ok(returnObject);
    }

    // todo: convert this to use the jwt
    @GetMapping("/sites")
    public Set<SiteDTO> getSites(@RequestHeader("Authorization") String jwtToken) {
        String userId = this.jwtService.extractUsername(jwtToken.substring(7));
        return managerService.getSites(userId);
    }
    
}
