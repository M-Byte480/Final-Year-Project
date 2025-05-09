package milan.backend.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ExceptionDTO {
    private String type;
    private String title;
    private int status;
    private String details;
    private String location;
    private String description;
}
