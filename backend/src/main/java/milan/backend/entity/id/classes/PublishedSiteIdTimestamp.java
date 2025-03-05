package milan.backend.entity.id.classes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublishedSiteIdTimestamp implements Serializable {
    private UUID siteId;
    private Instant publishTimestamp;
}
