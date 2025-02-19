package milan.backend.entity.site;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "pages")
public class PageEntity {
    @Id
    private UUID id;
    private UUID siteId;
    private String pageName;
}
