package milan.backend.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class RegistrationDTO {

    @Size(min = 2,
            message = "Firstname too short")
    @NotNull
    private String firstname;

    @Size(min = 2,
            message = "Surname too short")
    @NotNull
    private String surname;

    @Email(message = "Email must be valid")
    @NotNull
    private String email;

    @Pattern(regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)(?!.* ).{8,}",
            message = "Password does not meet the requirements")
    @NotNull
    private String password;

    @Past(message = "Date Of Birth is in the future")
    @NotNull
    private Date dateOfBirth;

}

