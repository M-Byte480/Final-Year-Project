package milan.backend.repository;

import milan.backend.entity.PublishedSiteEntity;
import milan.backend.entity.id.classes.PublishedSiteIdTimestamp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PublishedRepository extends JpaRepository<PublishedSiteEntity, PublishedSiteIdTimestamp> {
    // todo: figure this out
    List<PublishedSiteEntity> findAllBySiteId(UUID siteId);
    List<PublishedSiteEntity> findAllByIdOrderByUpdateTimestamp(UUID siteId);
}
