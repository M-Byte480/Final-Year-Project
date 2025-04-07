package milan.backend.model.dto;

import lombok.Data;

@Data
public class DeleteSiteDTO {
    private String siteId;
    private boolean acceptConsequences;
}
