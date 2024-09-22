package milan.backend.controller;

import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.extern.slf4j.Slf4j;
import milan.backend.exception.ServiceVerificationException;
import milan.backend.model.dto.RegistrationDTO;
import milan.backend.service.AuthenticationService;
import milan.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final UserService userService;

    public AuthenticationController(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping(
            value = "/register",
            produces = "application/json",
            consumes = "application/json"
    )
    public ResponseEntity<String> addNewUserFromRegistration(@Valid @RequestBody RegistrationDTO registeredUser) {
        try {
            userService.createUser(registeredUser);
            log.info("New user registered");
            return ResponseEntity.ok("User registered successfully");
        } catch (ServiceVerificationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }

    }
}
