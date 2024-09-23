package milan.backend.service;

import lombok.extern.slf4j.Slf4j;
import milan.backend.entity.User;
import milan.backend.exception.ServiceVerificationException;
import milan.backend.mapper.UserMapper;
import milan.backend.model.dto.RegistrationDTO;
import milan.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

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
        boolean doesUserExist = userRepository.findUserByEmailEquals(user.getEmail()).isPresent();

        if (doesUserExist) {
            log.error("Failed to validate user");
            throw new ServiceVerificationException("Email already in use");
        }

        Calendar today = Calendar.getInstance();

        Calendar dateOffset = Calendar.getInstance();
        dateOffset.setTime(user.getDateOfBirth());
        dateOffset.add(Calendar.YEAR, 18);

        boolean isValidDateOfBirth = dateOffset.compareTo(today) <= 0;

        if (!isValidDateOfBirth) {
            log.error("Failed to validate user");
            throw new ServiceVerificationException("User is not age of 18");
        }
    }
}
