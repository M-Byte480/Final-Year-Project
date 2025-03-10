package milan.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import milan.backend.entity.codes.VerificationCode;
import milan.backend.exception.CodeValidationException;
import milan.backend.exception.ExpiredException;
import milan.backend.exception.ServiceVerificationException;
import milan.backend.repository.VerificationCodesRepository;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Optional;

@Service
public class EmailService {
    private final JavaMailSender emailSender;
    private final SpringTemplateEngine templateEngine;
    private final RegistrationService registrationService;
    private final VerificationCodesRepository verificationCodesRepository;

    private final int FIVE_MINS_IN_SEC = 60 * 5;

    public EmailService(JavaMailSender emailSender,
                        SpringTemplateEngine templateEngine,
                        RegistrationService registrationService,
                        VerificationCodesRepository verificationCodesRepository) {
        this.emailSender = emailSender;
        this.templateEngine = templateEngine;
        this.registrationService = registrationService;
        this.verificationCodesRepository = verificationCodesRepository;
    }

    public void verifyUserEmailCorrelation(String email, String code) throws ExpiredException, CodeValidationException {
        Optional<VerificationCode> verificationCodeOptional = verificationCodesRepository.getVerificationCodeByEmail(email);

        if (verificationCodeOptional.isEmpty()) {
            throw new ServiceVerificationException("Verification Code does not exists for provided email: " + email);
        }

        VerificationCode verificationCodeEntity = verificationCodeOptional.get();
        Instant now = Instant.now();
        Instant expirationTimeLimit = now.minusSeconds(FIVE_MINS_IN_SEC);
        Instant codeCreationTime = verificationCodeEntity.getCreatedAt();

        if (!expirationTimeLimit.isBefore(codeCreationTime)) {
            throw new ExpiredException("code validation", "Expired");
        }

        if (!code.equals(verificationCodeEntity.getCode())) {
            throw new CodeValidationException("code validation", "Code does not match");
        }
    }
    

    public void sendEmail(String to, String subject) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
        String verificationCode = registrationService.generateCodeForUser(to);

        Context context = new Context();
        context.setVariable("verificationCode", verificationCode);
        context.setVariable("name", to);

        String htmlContent = templateEngine.process("email-template", context);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        emailSender.send(message);
    }
}
