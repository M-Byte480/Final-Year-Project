package milan.backend.repository;

import milan.backend.entity.IsDeployedEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository

public interface IsSiteDeployedRepository extends JpaRepository<IsDeployedEntity, UUID> {
    Optional<IsDeployedEntity> findBySiteId(UUID siteId);
}
