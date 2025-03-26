package milan.backend.model;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

@Data
public class PublishedSiteDTO {
    private JsonNode footer;
    private JsonNode navbar;
    private JsonNode body;
}
