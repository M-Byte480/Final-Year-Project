package milan.backend.entity.userManagement;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "site_roles")
public class SiteRoleEntity {
    @Id
    private UUID userId;

    private UUID siteId;

    private String role;
}
