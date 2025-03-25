package milan.backend.repository;

import milan.backend.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<ImageEntity, UUID> {
    Optional<ImageEntity> getBySiteIdAndForNavBar(UUID siteId, boolean forNavBar);
}
