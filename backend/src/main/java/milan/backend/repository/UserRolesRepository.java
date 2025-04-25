package milan.backend.repository;

import milan.backend.entity.userManagement.UserRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRolesRepository extends JpaRepository<UserRoleEntity, Integer> {

}
