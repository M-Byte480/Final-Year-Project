package milan.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "is_deployed")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IsDeployedEntity {
    @Id
    private UUID siteId;
    private boolean isDeployed;
}
