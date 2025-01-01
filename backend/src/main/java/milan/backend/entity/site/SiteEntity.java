package milan.backend.entity.site;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.UUID;

@Entity(name = "sites")
@Data
public class SiteEntity {
    @Id
    private UUID id;

}
