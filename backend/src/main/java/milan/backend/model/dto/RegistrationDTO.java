package milan.backend.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class RegistrationDTO {

    private String firstname;

    private String surname;

    private String username;

    @Email(message = "Email must be valid")
    @NotNull(message = "Email not provided")
    private String email;

    @Pattern(regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)(?!.* ).{8,}",
            message = "Password does not meet the requirements")
    @NotNull
    private String password;

    @Past(message = "Date Of Birth is in the future")
    @NotNull(message = "Date of Birth not provided")
    private Date dateOfBirth;

}

