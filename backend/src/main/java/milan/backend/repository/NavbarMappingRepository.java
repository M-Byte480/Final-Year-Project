package milan.backend.repository;

import milan.backend.entity.NavbarMapperEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NavbarMappingRepository extends JpaRepository<NavbarMapperEntity, UUID> {
}
