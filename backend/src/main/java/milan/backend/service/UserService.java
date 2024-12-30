package milan.backend.service;

import lombok.extern.slf4j.Slf4j;
import milan.backend.entity.userManagement.UserEntity;
import milan.backend.exception.ServiceVerificationException;
import milan.backend.mapper.UserMapper;
import milan.backend.model.dto.RegistrationDTO;
import milan.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Calendar;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String SALT;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       @Value("${salt}") String salt) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.SALT = salt;
    }

    public void createUser(RegistrationDTO registeredUser) {
        UserEntity userEntity = UserMapper.INSTANCE.fromDto(registeredUser);

        validateUser(userEntity);
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword() + this.SALT));
        userRepository.save(userEntity);
    }

    public void validateUserExistsByEmail(String email) throws ServiceVerificationException {
        Optional<UserEntity> user = userRepository.findUserEntityByEmailEquals(email);
        if (user.isEmpty()) {
            throw new ServiceVerificationException("User does not exists provided by the given email: " + email);
        }
    }

    private void validateUser(UserEntity userEntity) throws ServiceVerificationException {
        Optional<UserEntity> userOptional = userRepository.findUserEntityByEmailEquals(userEntity.getEmail());

        userOptional.ifPresent(value -> {
            userEntity.setId(value.getId());
            userEntity.setSignUpTime(Instant.now());
        });

        if (userOptional.isPresent() && userOptional.get().isVerified()) {
            log.error("Failed to validate user");
            throw new ServiceVerificationException("Email already in use");
        }

        boolean isValidDateOfBirth = isValidDateOfBirthEntered(userEntity);
        if (!isValidDateOfBirth) {
            log.error("Failed to validate user");
            throw new ServiceVerificationException("User is not age of 18");
        }
    }

    public UserEntity setEmailVerificationState(String email, boolean state) {
        Optional<UserEntity> user = userRepository.findUserEntityByEmailEquals(email);
        UserEntity userRow = user.orElseThrow(() -> new ServiceVerificationException("User does not exists provided by the given email: " + email));
        userRow.setVerified(state);
        return userRepository.save(userRow);
    }

    private boolean isValidDateOfBirthEntered(UserEntity userEntity) {
        Calendar today = Calendar.getInstance();

        Calendar dateOffset = Calendar.getInstance();
        dateOffset.setTime(userEntity.getDateOfBirth());
        dateOffset.add(Calendar.YEAR, 18);

        return dateOffset.compareTo(today) <= 0;
    }
}
