package milan.backend.service;

import lombok.extern.slf4j.Slf4j;
import milan.backend.entity.UserAdmin;
import milan.backend.mapper.UserAdminMapper;
import milan.backend.model.dto.UserAdminDTO;
import milan.backend.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthenticationService {

    private final AdminRepository adminRepository;

    public AuthenticationService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
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
}
