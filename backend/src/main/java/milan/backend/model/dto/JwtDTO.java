/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class JwtDTO {
    private String token;
    private Timestamp tokenExpirationTime;
    private String refreshToken;
    private Timestamp refreshTokenExpirationTime;

    public JwtDTO(String token, long tokenExpiresIn, String refreshToken, long refreshTokenExpiresIn) {
        long now = System.currentTimeMillis();
        this.token = token;
        this.tokenExpirationTime = new Timestamp(now + tokenExpiresIn);
        this.refreshToken = refreshToken;
        this.refreshTokenExpirationTime = new Timestamp(now + refreshTokenExpiresIn);
    }

    public JwtDTO(String token, long tokenExpiresIn, String refreshToken, Timestamp refreshTokenExpiration) {
        long now = System.currentTimeMillis();
        this.token = token;
        this.tokenExpirationTime = new Timestamp(now + tokenExpiresIn);
        this.refreshToken = refreshToken;
        this.refreshTokenExpirationTime = refreshTokenExpiration;
    }
}
