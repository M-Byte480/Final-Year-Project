package milan.backend.entity.id.classes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SiteIdPageIdCompositeKey implements Serializable {
    private UUID siteId;
    private UUID pageId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SiteIdPageIdCompositeKey that = (SiteIdPageIdCompositeKey) o;
        return Objects.equals(siteId, that.siteId) &&
                Objects.equals(pageId, that.pageId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(siteId, pageId);
    }
}