/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.repository;

import milan.backend.entity.site.SiteManagerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SiteManagerRepository extends JpaRepository<SiteManagerEntity, UUID> {
    Optional<List<SiteManagerEntity>> getAllByUserId(UUID userId);
    Optional<SiteManagerEntity> getSiteManagerEntitiesBySiteIdAndUserId(UUID siteId, UUID userId);
}
