/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JwtDTO {
    private String token;
    private String refreshToken;

    public JwtDTO(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}
