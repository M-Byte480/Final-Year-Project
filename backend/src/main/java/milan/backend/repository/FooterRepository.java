package milan.backend.repository;

import milan.backend.entity.FooterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FooterRepository extends JpaRepository<FooterEntity, UUID> {

}
