/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.entity.id.classes;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
public class UserRoleId implements Serializable {
    private UUID userId;
    private Integer roleId;

    public UserRoleId(UUID userId, Integer roleId) {
        this.userId = userId;
        this.roleId = roleId;
    }
}
