package milan.backend.service;

import lombok.extern.slf4j.Slf4j;
import milan.backend.entity.UserAdmin;
import milan.backend.entity.VerificationCode;
import milan.backend.mapper.UserAdminMapper;
import milan.backend.model.dto.UserAdminDTO;
import milan.backend.repository.AdminRepository;
import milan.backend.repository.VerificationCodesRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@Slf4j
public class RegistrationService {

    private final AdminRepository adminRepository;
    private final VerificationCodesRepository verificationCodesRepository;
    private final UserService userService;

    public RegistrationService(AdminRepository adminRepository,
                               VerificationCodesRepository verificationCodesRepository,
                               UserService userService) {
        this.adminRepository = adminRepository;
        this.userService = userService;
        this.verificationCodesRepository = verificationCodesRepository;
    }

    public String generateCodeForUser(String email) {
        String code = generateVerificationCode();
        addTemporaryCodeToDatabase(email, code);
        return code;
    }

    public void addUserToAdmin(UserAdminDTO user) {
        UserAdmin admin = new UserAdmin();
        admin.setUserId(user.getUserId());
        adminRepository.save(admin);
        log.info("Promoting user: {}", user.getUserId());
    }

    public void removeAdmin(UserAdminDTO user) {
        adminRepository.delete(UserAdminMapper.INSTANCE.fromDto(user));
        log.info("Demoting user: {}", user.getUserId());
    }

    private void addTemporaryCodeToDatabase(String email, String code) {
        userService.validateUserExistsByEmail(email);

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setCode(code);
        verificationCode.setEmail(email);
        verificationCode.setTimestamp(LocalDateTime.now());
        verificationCodesRepository.save(verificationCode);
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int number = random.nextInt(999999);
        return String.format("%06d", number);
    }
}
