package milan.backend.controller;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import milan.backend.exception.ServiceVerificationException;
import milan.backend.exception.ValidationException;
import milan.backend.model.dto.ErrorDTO;
import milan.backend.model.dto.VerificationDTO;
import milan.backend.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.exceptions.TemplateInputException;

@Slf4j
@Controller
@RequestMapping("/email")
public class EmailController {
    private static final String VERIFICATION_SUBJECT = "Verification code for Milanify";
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/send-verification")
    @ResponseBody
    public ResponseEntity<String> sendVerificationEmail(@Valid @RequestBody VerificationDTO verificationRequest) {
        try {
            emailService.sendEmail(verificationRequest.getEmail(), VERIFICATION_SUBJECT);
        } catch (TemplateInputException | MessagingException | ServiceVerificationException e) {
            log.error("Failed to send Verification Email");
            return new ResponseEntity<>("Failed to send email", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("Sent");
    }

    @PostMapping("/verify")
    @ResponseBody
    public ResponseEntity<Object> submitVerificationCode(@Valid @RequestBody VerificationDTO verificationDTO) {
        String email = verificationDTO.getEmail();
        String code = verificationDTO.getCode();
        ErrorDTO error = new ErrorDTO();

        try {
            emailService.verifyUserEmailCorrelation(email, code);
        } catch (ValidationException e) {
            error.setError(e.getWhat());
            error.setReason(e.getReason());
        } catch (ServiceVerificationException e) {
            error.setError("authentication");
            error.setReason(e.getReason());
        }

        if (error.getError() != null) {
            return new ResponseEntity<>(error, HttpStatus.CONFLICT);
        }

        return ResponseEntity.ok("success");
    }
}
