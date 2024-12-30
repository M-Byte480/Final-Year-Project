
package milan.backend.service;

import milan.backend.entity.userManagement.UserEntity;
import milan.backend.model.dto.LoginDTO;
import milan.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    public LoginService(UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;

        this.authenticationManager = authenticationManager;
    }

    public UserEntity login(LoginDTO input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findUserEntityByEmailEquals(input.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
