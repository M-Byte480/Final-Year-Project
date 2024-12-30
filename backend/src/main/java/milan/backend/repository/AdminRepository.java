package milan.backend.repository;

import milan.backend.entity.userManagement.UserAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<UserAdmin, Integer> {

}
