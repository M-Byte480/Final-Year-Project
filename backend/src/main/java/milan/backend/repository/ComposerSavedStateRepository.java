package milan.backend.repository;

import milan.backend.entity.ComposerPageEntity;
import milan.backend.entity.id.classes.SiteIdPageIdCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ComposerSavedStateRepository extends JpaRepository<ComposerPageEntity, SiteIdPageIdCompositeKey> {
    Optional<ComposerPageEntity> findBySiteIdPageIdCompositeKey(SiteIdPageIdCompositeKey siteIdPageIdCompositeKey);
}
