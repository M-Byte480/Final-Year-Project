package milan.backend.controllers;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class UserContentController {

    @GetMapping("/user")
    @Secured("USER")
    public String userContent() {
        return "User content";
    }

}
