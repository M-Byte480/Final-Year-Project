package milan.backend.repository;

import milan.backend.entity.site.SiteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SiteRepository extends JpaRepository<SiteEntity, UUID> {
}
