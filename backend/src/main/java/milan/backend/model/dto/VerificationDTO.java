package milan.backend.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VerificationDTO {
    @NotNull
    String email;

    String code;
}
