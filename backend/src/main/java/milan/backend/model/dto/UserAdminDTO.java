package milan.backend.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserAdminDTO {
    @NotNull
    private Integer userId;
}
