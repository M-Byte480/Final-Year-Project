package milan.backend.repository;

import milan.backend.entity.site.SiteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface SiteRepository extends JpaRepository<SiteEntity, UUID> {
}
