package milan.backend.service;

import lombok.extern.slf4j.Slf4j;
import milan.backend.entity.User;
import milan.backend.exception.ServiceVerificationException;
import milan.backend.mapper.UserMapper;
import milan.backend.model.dto.RegistrationDTO;
import milan.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Slf4j
@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean createUser(RegistrationDTO registeredUser) {
        User user = UserMapper.INSTANCE.fromDto(registeredUser);

        try {
            validateUser(user);
        } catch (ServiceVerificationException e) {
            log.error("Failed to validate user");
            throw e;
        }

        userRepository.save(user);
        return true;
    }

    private void validateUser(User user) throws ServiceVerificationException {
        boolean doesUserExist = userRepository.findUserByEmailEquals(user.getEmail()).isPresent();

        if (doesUserExist) {
            log.error("Email already in use");
            throw new ServiceVerificationException("Email already in use");
        }

        Calendar today = Calendar.getInstance();

        Calendar dateOffset = Calendar.getInstance();
        dateOffset.setTime(user.getDateOfBirth());
        dateOffset.add(Calendar.YEAR, 18);

        boolean isValidDateOfBirth = dateOffset.compareTo(today) <= 0;

        if (!isValidDateOfBirth) {
            log.error("User is under 18");
            throw new ServiceVerificationException("User is not age of 18");
        }
    }
}
