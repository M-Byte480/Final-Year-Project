/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginDTO {
    @Email(message = "Email must be valid")
    @NotNull(message = "Email not provided")
    private String email;

    @NotNull(message = "Password not provided")
    private String password;
}
