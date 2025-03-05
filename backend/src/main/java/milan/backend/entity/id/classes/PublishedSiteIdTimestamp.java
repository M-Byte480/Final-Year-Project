package milan.backend.entity.id.classes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublishedSiteIdTimestamp implements Serializable {
    private UUID siteId;
    private Instant publishTimestamp;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PublishedSiteIdTimestamp that = (PublishedSiteIdTimestamp) o;
        return Objects.equals(siteId, that.siteId) &&
                Objects.equals(publishTimestamp, that.publishTimestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(siteId, publishTimestamp);
    }
}
