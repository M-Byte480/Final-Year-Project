package milan.backend.entity.userManagement;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import milan.backend.entity.id.classes.UserRoleId;

import java.util.UUID;

@Entity
@Data
@Table(name = "user_roles")
@IdClass(UserRoleId.class)
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleEntity {
    @Id
    private UUID userId;
    @Id
    private Integer roleId;
}
