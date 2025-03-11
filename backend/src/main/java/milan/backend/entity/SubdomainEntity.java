package milan.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="subdomain_records")
public class SubdomainEntity {
    @Id
    private UUID siteId;
    private String subdomain;
    private boolean isDeployed;
}
