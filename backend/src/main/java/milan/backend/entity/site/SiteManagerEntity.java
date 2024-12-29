/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.entity.site;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "site_manager_state")
public class SiteManagerEntity {
    @Id
    private UUID id;

    @UpdateTimestamp
    Instant lastUpdate;
}
