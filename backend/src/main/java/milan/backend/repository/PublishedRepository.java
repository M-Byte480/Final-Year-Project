package milan.backend.repository;

import milan.backend.entity.PublishedSiteEntity;
import milan.backend.entity.id.classes.PublishedSiteIdTimestamp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PublishedRepository extends JpaRepository<PublishedSiteEntity, PublishedSiteIdTimestamp> {
    List<PublishedSiteEntity> findAllById_SiteId(UUID siteId);
    List<PublishedSiteEntity> findAllById_SiteIdOrderById_PublishTimestamp(UUID siteId);
}
