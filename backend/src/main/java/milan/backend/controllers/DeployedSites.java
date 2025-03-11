package milan.backend.controllers;

import lombok.AllArgsConstructor;
import milan.backend.model.dto.SubdomainDTO;
import milan.backend.service.SiteComposerService;
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

    @GetMapping("/get-site")
    public ResponseEntity<Object> getSite(@RequestParam("subdomain") String subdomain){
        return null;
    }

    @GetMapping("/history")
    public ResponseEntity<Object> getHistory(){
        return null;
    }

    @PostMapping("/deploy")
    public ResponseEntity<Object> deploySite(){
        return null;
    }

    @PostMapping("/abort")
    public ResponseEntity<Object> abortDeployment(){
        return null;
    }

    @PostMapping("/subdomain")
    public ResponseEntity<Object> setSubdomain(@RequestBody SubdomainDTO subdomainDTO){
        UUID siteUUID = UUID.fromString(subdomainDTO.getSiteId());
        String subdomain = subdomainDTO.getSubdomain();
        if(subdomain == null || subdomain.isEmpty()){
            return null;
        }
        this.siteComposerService.setSubdomain(siteUUID, subdomain);

        return ResponseEntity.ok().build();
    }
}
