package milan.backend.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResponseDTO {
    private String message;
    private String error;

    public ApiResponseDTO(String message) {
        this.message = message;
    }

    public ApiResponseDTO(String error, String message) {
        this.error = error;
        this.message = message;
    }
}
