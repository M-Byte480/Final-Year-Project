package milan.backend.controllers;

import lombok.AllArgsConstructor;
import milan.backend.entity.PublishedSiteEntity;
import milan.backend.service.PublisherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/release")
public class ReleaseController {
    private final PublisherService publisherService;

    @GetMapping("/site")
    public ResponseEntity<PublishedSiteEntity> getPublishedSite(@RequestParam("siteId") String siteId){
        UUID siteUUID = UUID.fromString(siteId);
        PublishedSiteEntity publishedSite = this.publisherService.getLatestSiteEntityForSiteId(siteUUID);
        return ResponseEntity.ok().body(publishedSite);
    }

}
