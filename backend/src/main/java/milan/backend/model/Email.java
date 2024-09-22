package milan.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Email {
    private String to;
    private String from;
    private String message;
    private String name;
    private String verificationCode;
}
