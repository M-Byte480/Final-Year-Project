package milan.backend.controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import milan.backend.entity.userManagement.UserEntity;
import milan.backend.exception.ServiceVerificationException;
import milan.backend.model.bean.ErrorBean;
import milan.backend.model.dto.ApiResponseDTO;
import milan.backend.model.dto.JwtDTO;
import milan.backend.model.dto.LoginDTO;
import milan.backend.model.dto.RegistrationDTO;
import milan.backend.model.dto.UserAdminDTO;
import milan.backend.service.JwtService;
import milan.backend.service.LoginService;
import milan.backend.service.RegistrationService;
import milan.backend.service.UserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthenticationController {

    private final RegistrationService registrationService;
    private final UserService userService;
    private final LoginService loginService;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public AuthenticationController(
            RegistrationService registrationService,
            UserService userService,
            LoginService loginService,
            JwtService jwtService,
            @Qualifier("userDetailsService") UserDetailsService userDetailsService) {
        this.registrationService = registrationService;
        this.userService = userService;
        this.loginService = loginService;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping(value = "/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Test endpoint is working");
    }

    @PostMapping(value = "/register",
            produces = "application/json",
            consumes = "application/json")
    public ResponseEntity<ApiResponseDTO> addNewUserFromRegistration(@Valid @RequestBody RegistrationDTO registeredUser) {
        try {
            userService.createUser(registeredUser);
            log.info("New user registered");
            ApiResponseDTO apiResponse = new ApiResponseDTO(registeredUser.getEmail());
            return ResponseEntity.ok(apiResponse);
        } catch (ServiceVerificationException e) {
            ErrorBean errorBean = new ErrorBean();
            errorBean.setError(e.getMessage());

            ApiResponseDTO apiResponse = new ApiResponseDTO();
            apiResponse.setError(errorBean.getError());

            return ResponseEntity.status(HttpStatus.CONFLICT).body(apiResponse);
        }
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<JwtDTO> loginUser(@Valid @RequestBody LoginDTO loginDTO) {
        UserEntity authenticatedUserEntity = loginService.login(loginDTO);

        String jwtToken = jwtService.generateToken(authenticatedUserEntity);
        String refreshToken = jwtService.generateRefreshToken(authenticatedUserEntity);

        JwtDTO jwtDTO = new JwtDTO(jwtToken, refreshToken);

        return ResponseEntity
                .ok()
                .body(jwtDTO);
    }

    @PostMapping(value = "/refresh", consumes = "application/json")
    public ResponseEntity<JwtDTO> refreshToken(@Valid @RequestBody JwtDTO refreshTokenDTO) {
        String refreshToken = refreshTokenDTO.getRefreshToken();
        // TODO: Change this to use userId
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(refreshToken));

        if (jwtService.isRefreshTokenValid(refreshToken, userDetails)) {
            String newAccessToken = jwtService.generateToken(userDetails);

            return ResponseEntity.ok(new JwtDTO(newAccessToken, refreshToken));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping(value = "/admin", consumes = "application/json")
    public ResponseEntity<ApiResponseDTO> addUserToAdmin(@Valid @RequestBody UserAdminDTO userAdminDTO) {
        // todo: Validate who is sending the request
//        registrationService.addUserToAdmin(userAdminDTO);

        ApiResponseDTO response = new ApiResponseDTO("User has been promoted to admin");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "/admin", consumes = "application/json")
    public ResponseEntity<ApiResponseDTO> removeAdmin(@Valid @RequestBody UserAdminDTO userAdminDTO) {
        // todo: Validate who is sending the request
        registrationService.removeAdmin(userAdminDTO);

        ApiResponseDTO response = new ApiResponseDTO("User has been demoted from admin");
        return ResponseEntity.ok(response);
    }
}
