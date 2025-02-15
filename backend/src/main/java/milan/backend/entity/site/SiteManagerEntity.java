/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.entity.site;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import milan.backend.entity.id.classes.UserSiteId;

import java.util.UUID;

@Entity
@Table(name = "user_to_site")
@Data
@IdClass(UserSiteId.class)
@NoArgsConstructor
@AllArgsConstructor
public class SiteManagerEntity {
    @Id
    private UUID userId;

    @Id
    private UUID siteId;

    @Column
    private String siteName;

}
