package milan.backend.repository;

import milan.backend.entity.site.PageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PageRepository extends JpaRepository<PageEntity, UUID> {

}
