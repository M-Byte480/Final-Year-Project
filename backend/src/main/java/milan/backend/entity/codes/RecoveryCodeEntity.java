/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.entity.codes;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "recovery_codes")
public class RecoveryCodeEntity {
    @Id
    private String email;

    private String code;

    private Instant expiryTime;
}
