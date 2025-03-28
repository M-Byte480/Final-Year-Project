package milan.backend.repository;

import milan.backend.entity.site.PageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface PageRepository extends JpaRepository<PageEntity, UUID> {
    boolean existsByPageNameAndSiteId(String pageName, UUID siteId);
    Set<PageEntity> findAllBySiteId(UUID siteId);

    @Query("SELECT id FROM pages WHERE siteId = ?1")
    List<UUID> getAllPageIds(UUID siteId);

    Optional<PageEntity> findById(UUID id);
}
