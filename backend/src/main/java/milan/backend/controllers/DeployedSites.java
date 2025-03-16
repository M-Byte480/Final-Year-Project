package milan.backend.controllers;

import lombok.AllArgsConstructor;
import milan.backend.model.dto.DeployDTO;
import milan.backend.model.dto.DeployedSiteDTO;
import milan.backend.model.dto.DeploymentHistoryDTO;
import milan.backend.model.dto.DomainNameDTO;
import milan.backend.model.dto.SubdomainDTO;
import milan.backend.service.SiteComposerService;
import milan.backend.service.SubdomainService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/api/sites")
public class DeployedSites {
    private final SiteComposerService siteComposerService;
    private final SubdomainService subdomainService;

    @GetMapping("/get-site")
    public ResponseEntity<DeployedSiteDTO> getSite(@RequestParam("subdomain") String subdomain){
        return null;
    }

    @GetMapping("/history")
    public ResponseEntity<DeploymentHistoryDTO> getHistory(){
        return null;
    }

    @PostMapping("/deploy")
    public ResponseEntity<DeployDTO> deploySite(@RequestBody DeployDTO deployDTO){
        this.subdomainService.tryDeploy(deployDTO);
        return null;
    }

    @PostMapping("/abort")
    public ResponseEntity<Object> abortDeployment(){
        return null;
    }

    @PostMapping("/subdomain")
    public ResponseEntity<Object> setSubdomain(@RequestBody SubdomainDTO subdomainDTO){
        UUID siteUUID = UUID.fromString(subdomainDTO.getSiteId());
        String subdomain = subdomainDTO.getDomainName();
        if(subdomain == null || subdomain.isEmpty()){
            return null;
        }
        this.subdomainService.setSubdomain(siteUUID, subdomain);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/subdomain")
    public ResponseEntity<Object> getSubdomain(@RequestParam("siteId") String siteId){
        UUID siteUUID = UUID.fromString(siteId);
        String subdomain = this.subdomainService.getSubdomain(siteUUID);
        DomainNameDTO domainNameDTO = new DomainNameDTO();
        domainNameDTO.setDomainName(subdomain);
        return ResponseEntity.ok(domainNameDTO);
    }
}
