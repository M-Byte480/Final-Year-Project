package milan.backend.repository;

import milan.backend.entity.site.SiteComposerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SiteComposerRepository extends JpaRepository<SiteComposerEntity, UUID> {
}
