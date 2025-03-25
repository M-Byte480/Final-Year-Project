package milan.backend.controllers;

import lombok.AllArgsConstructor;
import milan.backend.entity.PublishedSiteEntity;
import milan.backend.model.PublishedSiteDTO;
import milan.backend.model.dto.DeployDTO;
import milan.backend.model.dto.DeployedSiteDTO;
import milan.backend.model.dto.DomainNameDTO;
import milan.backend.model.dto.SubdomainDTO;
import milan.backend.service.PublisherService;
import milan.backend.service.SiteComposerService;
import milan.backend.service.SubdomainService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/api/sites")
public class DeployedSites {
    private final SiteComposerService siteComposerService;
    private final SubdomainService subdomainService;
    private final PublisherService publisherService;

    @GetMapping("/get-site")
    public ResponseEntity<DeployedSiteDTO> getSite(@RequestParam("subdomain") String subdomain){
        return null;
    }

    @GetMapping("/history")
    public ResponseEntity<List<PublishedSiteEntity>> getHistory(@RequestParam("siteId") String siteId){
        List<PublishedSiteEntity> s = this.subdomainService.getHistory(siteId);
        return ResponseEntity.ok(s);
    }

    @PostMapping("/deploy")
    public ResponseEntity<PublishedSiteEntity> deploySite(@RequestBody DeployDTO deployDTO){
        PublishedSiteEntity e = this.subdomainService.tryDeploy(deployDTO);
        return ResponseEntity.ok(e);
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

    @GetMapping("/site")
    public ResponseEntity<Object> getDeployedSite(@RequestParam("subRoute") String subRoute,
                                               @RequestParam("subPageName") String pageName){
        return ResponseEntity.ok(this.subdomainService.getSiteFromRouteAndName(subRoute, pageName));
    }

    @GetMapping("deployed-site")
    public ResponseEntity<PublishedSiteDTO> test(@RequestParam("subRoute") String subdomain,
                                                 @RequestParam("subPageName") String pageName){
        return ResponseEntity.ok(this.publisherService.getSiteFromRouteAndName(subdomain, pageName));
    }

}
