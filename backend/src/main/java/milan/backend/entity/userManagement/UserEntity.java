/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.entity.userManagement;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.time.Instant;
import java.util.*;

@Entity
@Data
@Table(name = "users")
public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue(generator = "UUID")
    @Column
    private UUID id;

    @Column
    private String username;

    @Column
    private String firstname;

    @Column
    private String surname;

    @Column
    private String email;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "signed_up", insertable = false)
    private Instant signUpTime;

    @Column
    private String password;

    @Column
    private boolean verified;

//    // Source https://medium.com/@bubu.tripathy/role-based-access-control-with-spring-security-ca59d2ce80b0
//    @ManyToMany
//    @JoinTable(name = "site_roles",
//            joinColumns = @JoinColumn(name = "user_id"))
//    private Set<RoleEntity> roles = new HashSet<>();

    public Set<RoleEntity> getRoles() {
        return new HashSet<>();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return String.valueOf(id);
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
