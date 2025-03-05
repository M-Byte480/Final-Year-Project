package milan.backend.service;

import lombok.AllArgsConstructor;
import milan.backend.entity.PublishedSiteEntity;
import milan.backend.repository.PublishedRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PublisherService {
    private final PublishedRepository publishRepository;

    // todo: sort this out for controller
    public PublishedSiteEntity getSiteEntityForSiteID(UUID siteId){
        List<PublishedSiteEntity> publishedSiteHistory = this.publishRepository.findAllBySiteId(siteId);
    }
}
