package milan.backend.repository;

import milan.backend.entity.PublishedPageEntity;
import milan.backend.entity.id.classes.SiteIdPageIdCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PublishedPagesRepository extends JpaRepository<PublishedPageEntity, SiteIdPageIdCompositeKey> {
    Optional<PublishedPageEntity> findById_SiteIdAndPageName(UUID siteId, String pageName);
}
