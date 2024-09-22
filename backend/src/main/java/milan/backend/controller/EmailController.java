package milan.backend.controller;

import jakarta.mail.MessagingException;
import milan.backend.service.EmailService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.exceptions.TemplateInputException;

import java.util.HashMap;

@Controller
@RequestMapping("/email")
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/send-verification")
    @ResponseBody
    public String sendVerificationEmail() {
        try {
            emailService.sendEmail("21308128@studentmail.ul.ie", "kmilanm13@gmail.com", new HashMap<>());
        } catch (TemplateInputException | MessagingException e) {
            System.out.println("Failed to send email");
            return "not sent";
        }
        return "sent";
    }
}
