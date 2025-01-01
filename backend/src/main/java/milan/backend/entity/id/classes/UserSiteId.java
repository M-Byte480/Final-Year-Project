package milan.backend.entity.id.classes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSiteId implements Serializable {
    private UUID userId;
    private UUID siteId;
}
