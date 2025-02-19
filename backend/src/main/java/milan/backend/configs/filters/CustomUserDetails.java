/*
Made with the help of ChatGPT
 */

package milan.backend.configs.filters;

import milan.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CustomUserDetails implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetails(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        try{
            UUID uuid = UUID.fromString(userId);
            return userRepository.findById(uuid)
                    .orElseThrow(() -> new UsernameNotFoundException("User with ID " + userId + " not found"));
        } catch (IllegalArgumentException e) {
            throw new UsernameNotFoundException("Invalid UUID " + userId);
        }
    }
}
