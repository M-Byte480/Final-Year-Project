/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.entity.userManagement;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "roles")
public class RoleEntity {
    @Id
    private String name;
}
