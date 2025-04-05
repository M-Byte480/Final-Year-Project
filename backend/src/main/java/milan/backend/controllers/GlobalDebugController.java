package milan.backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalDebugController {

    @RequestMapping("/**")
    public ResponseEntity<String> catchAll(HttpServletRequest request) {
        System.out.println("🔍 Unmatched request to: " + request.getRequestURI() + " [" + request.getMethod() + "]");
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("No handler for " + request.getRequestURI());
    }
}