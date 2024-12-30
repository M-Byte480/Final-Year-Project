package milan.backend.repository;

import milan.backend.entity.userManagement.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    Optional<UserEntity> findUserEntityByEmailEquals(String email);

    Optional<UserEntity> findUserEntityByIdEquals(UUID userId);
}
