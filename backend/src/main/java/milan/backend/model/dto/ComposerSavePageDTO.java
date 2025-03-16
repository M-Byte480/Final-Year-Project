package milan.backend.model.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

@Data
public class ComposerSavePageDTO {
    private String siteId;
    private String pageId;
    private JsonNode state;
}
