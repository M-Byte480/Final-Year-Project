package milan.backend.repository;

import milan.backend.entity.UserPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPasswordRepository extends JpaRepository<UserPassword, Integer> {
    UserPassword getUserPasswordById(Integer id);
}
