package milan.backend.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class UserAdminDTO {
    @NotNull
    private UUID userId;
}
