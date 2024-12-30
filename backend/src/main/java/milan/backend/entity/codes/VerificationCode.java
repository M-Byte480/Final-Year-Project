/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.entity.codes;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Data
@Entity
@Table(name = "verification_codes")
public class VerificationCode {
    @Id
    @Column(name = "email", columnDefinition = "text", nullable = false)
    @JoinColumn(name = "users", referencedColumnName = "email", insertable = false, updatable = false)
    String email;

    @Column
    String code;

    @CreationTimestamp
    private Instant createdAt;
}
