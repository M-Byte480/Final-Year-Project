package milan.backend.controllers;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import milan.backend.entity.userManagement.UserEntity;
import milan.backend.exception.ServiceVerificationException;
import milan.backend.exception.ValidationException;
import milan.backend.model.dto.ApiResponseDTO;
import milan.backend.model.dto.ErrorDTO;
import milan.backend.model.dto.VerificationDTO;
import milan.backend.service.EmailService;
import milan.backend.service.RolesService;
import milan.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.exceptions.TemplateInputException;

@Slf4j
@RestController
@RequestMapping("/api/email")
public class EmailController {
    private static final String VERIFICATION_SUBJECT = "Verification code for Milanify";
    private final EmailService emailService;
    private final UserService userService;
    private final RolesService rolesService;

    public EmailController(EmailService emailService, UserService userService, RolesService rolesService) {
        this.emailService = emailService;
        this.userService = userService;
        this.rolesService = rolesService;
    }

    @PostMapping("/send-verification")
    public ResponseEntity<ApiResponseDTO> sendVerificationEmail(@Valid @RequestBody VerificationDTO verificationRequest) {
        ApiResponseDTO response = new ApiResponseDTO();

        try {
            emailService.sendEmail(verificationRequest.getEmail(), VERIFICATION_SUBJECT);
        } catch (TemplateInputException | MessagingException | ServiceVerificationException e) {
            log.error("Failed to send Verification Email");

            response.setError("Failed to send email");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        response.setMessage("Sent");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponseDTO> submitVerificationCode(@Valid @RequestBody VerificationDTO verificationDTO) {
        String email = verificationDTO.getEmail();
        String code = verificationDTO.getCode();
        ErrorDTO error = new ErrorDTO();
        ApiResponseDTO response = new ApiResponseDTO();

        try {
            emailService.verifyUserEmailCorrelation(email, code);
            UserEntity user = userService.setEmailVerificationState(email, true);
            rolesService.addRoleToUserId(user.getId(), "USER");
        } catch (ValidationException e) {
            error.setError(e.getWhat());
            error.setReason(e.getReason());
        } catch (ServiceVerificationException e) {
            error.setError("authentication");
            error.setReason(e.getReason());
        }

        if (error.getError() != null) {
            response.setError(error.getError() + ": " + error.getReason());
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }

        response.setMessage("success");
        return ResponseEntity.ok(response);
    }
}
