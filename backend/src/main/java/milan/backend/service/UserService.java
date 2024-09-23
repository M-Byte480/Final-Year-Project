package milan.backend.service;

import lombok.extern.slf4j.Slf4j;
import milan.backend.entity.User;
import milan.backend.exception.ServiceVerificationException;
import milan.backend.mapper.UserMapper;
import milan.backend.model.dto.RegistrationDTO;
import milan.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(RegistrationDTO registeredUser) {
        User user = UserMapper.INSTANCE.fromDto(registeredUser);

        validateUser(user);

        userRepository.save(user);
    }

    public void validateUserExistsByEmail(String email) throws ServiceVerificationException {
        Optional<User> user = userRepository.findUserByEmailEquals(email);
        if (user.isEmpty()) {
            throw new ServiceVerificationException("User does not exists provided by the given email: " + email);
        }
    }

    private void validateUser(User user) throws ServiceVerificationException {
        Optional<User> userOptional = userRepository.findUserByEmailEquals(user.getEmail());

        userOptional.ifPresent(value -> user.setId(value.getId()));
        userOptional.ifPresent(value -> user.setSignUpTime(LocalDateTime.now()));

        if (userOptional.isPresent() && userOptional.get().isVerified()) {
            log.error("Failed to validate user");
            throw new ServiceVerificationException("Email already in use");
        }

        boolean isValidDateOfBirth = isValidDateOfBirthEntered(user);
        if (!isValidDateOfBirth) {
            log.error("Failed to validate user");
            throw new ServiceVerificationException("User is not age of 18");
        }
    }

    private boolean isValidDateOfBirthEntered(User user) {
        Calendar today = Calendar.getInstance();

        Calendar dateOffset = Calendar.getInstance();
        dateOffset.setTime(user.getDateOfBirth());
        dateOffset.add(Calendar.YEAR, 18);

        return dateOffset.compareTo(today) <= 0;
    }
}
