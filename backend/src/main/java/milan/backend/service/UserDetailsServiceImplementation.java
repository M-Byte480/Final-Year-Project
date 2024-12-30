/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 * Code taken from: https://medium.com/@bubu.tripathy/role-based-access-control-with-spring-security-ca59d2ce80b0
 */

package milan.backend.service;

import milan.backend.entity.userManagement.RoleEntity;
import milan.backend.entity.userManagement.UserEntity;
import milan.backend.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class UserDetailsServiceImplementation implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findUserEntityByEmailEquals(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User with email " + email + " not found")
                );

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                getAuthorities(user.getRoles())
        );
    }

    public UserDetails loadUserByUserId(UUID userId) throws UsernameNotFoundException {
        UserEntity user = userRepository.findUserEntityByIdEquals(userId)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User with id " + userId + " not found")
                );

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                getAuthorities(user.getRoles())
        );
    }


    private Set<GrantedAuthority> getAuthorities(Set<RoleEntity> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRoleName()))
                .collect(Collectors.toSet());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return loadUserByEmail(username);
    }
}
