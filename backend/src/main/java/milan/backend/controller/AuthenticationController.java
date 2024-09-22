package milan.backend.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import milan.backend.exception.ServiceVerificationException;
import milan.backend.model.bean.ErrorBean;
import milan.backend.model.dto.RegistrationDTO;
import milan.backend.model.dto.UserAdminDTO;
import milan.backend.repository.AdminRepository;
import milan.backend.service.AuthenticationService;
import milan.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    private final AdminRepository adminRepository;

    public AuthenticationController(AuthenticationService authenticationService, UserService userService, AdminRepository adminRepository) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.adminRepository = adminRepository;
    }

    @PostMapping(value = "/register",
            produces = "application/json",
            consumes = "application/json")
    public ResponseEntity<Object> addNewUserFromRegistration(@Valid @RequestBody RegistrationDTO registeredUser) {
        try {
            userService.createUser(registeredUser);
            log.info("New user registered");
            return ResponseEntity.ok("User registered successfully");
        } catch (ServiceVerificationException e) {
            ErrorBean errorBean = new ErrorBean();
            errorBean.setError(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorBean);
        }
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<String> loginUser() {
        return null;
    }

    @PostMapping(value = "/admin", consumes = "application/json")
    public ResponseEntity<String> addUserToAdmin(@Valid @RequestBody UserAdminDTO userAdminDTO) {
        // todo: Validate who is sending the request
        authenticationService.addUserToAdmin(userAdminDTO);

        return ResponseEntity.ok("User has been promoted to admin");
    }

    @DeleteMapping(value = "/admin", consumes = "application/json")
    public ResponseEntity<String> removeAdmin(@Valid @RequestBody UserAdminDTO userAdminDTO) {
        // todo: Validate who is sending the request
        authenticationService.removeAdmin(userAdminDTO);
        return ResponseEntity.ok("User has been demoted from admin");
    }
}
