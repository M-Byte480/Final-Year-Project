package milan.backend.model.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class DeployDTO {
    private String siteId;
    private JsonNode navbar;
    private List<UUID> pageIds;
    private JsonNode footer;
    private boolean deployed;
    private String error;
}
