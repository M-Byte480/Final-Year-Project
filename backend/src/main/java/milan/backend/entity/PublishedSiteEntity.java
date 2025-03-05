package milan.backend.entity;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import milan.backend.entity.id.classes.PublishedSiteIdTimestamp;

import java.time.Instant;
import java.util.UUID;

@Data
@Entity
@Table(name = "published_site_records")
@IdClass(PublishedSiteIdTimestamp.class)
@AllArgsConstructor
@NoArgsConstructor
public class PublishedSiteEntity {
    @Id
    private UUID siteId;
    @Id
    private Instant publishTimestamp;

    private JsonNode navBar;
    private JsonNode mainBody;
    private JsonNode footer;
}
