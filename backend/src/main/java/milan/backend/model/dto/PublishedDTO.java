package milan.backend.model.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import milan.backend.entity.id.classes.PublishedSiteIdTimestamp;

@Data
public class PublishedDTO {

    private PublishedSiteIdTimestamp id;

    private JsonNode navBar;

    private JsonNode footer;

    private boolean deployed;
}
