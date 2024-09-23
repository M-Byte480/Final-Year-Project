package milan.backend.repository;

import milan.backend.entity.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationCodesRepository extends JpaRepository<VerificationCode, String> {
    Optional<VerificationCode> getVerificationCodeByEmail(String email);
}
