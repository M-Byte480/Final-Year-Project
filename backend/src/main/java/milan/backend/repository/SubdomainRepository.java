package milan.backend.repository;

import milan.backend.entity.SubdomainEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SubdomainRepository extends JpaRepository<SubdomainEntity, UUID> {
    Optional<SubdomainEntity> findBySiteId(UUID siteId);
}
