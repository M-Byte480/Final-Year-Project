package milan.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

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
    private LocalDateTime timestamp;
}
