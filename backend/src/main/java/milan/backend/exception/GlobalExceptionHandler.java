package milan.backend.exception;

import lombok.extern.slf4j.Slf4j;
import milan.backend.model.dto.ExceptionDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.LinkedList;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDTO> handleException(Exception e) {
        ExceptionDTO errorDetails = new ExceptionDTO();
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        log.error("Exception: ", e);

        if (e instanceof MethodArgumentNotValidException) {
            errorDetails.setType("MethodArgumentNotValidException");
            errorDetails.setTitle("Validation Error");
            errorDetails.setStatus(HttpStatus.BAD_REQUEST.value());
            errorDetails.setDetails("Validation failed for the request");
            errorDetails.setLocation("Request body");

            LinkedList<String> errors = new LinkedList<>();
            ((MethodArgumentNotValidException) e).getBindingResult().getAllErrors().forEach((error) -> {
                String message = error.getDefaultMessage();
                errors.add(String.format("%s", message));
            });

            errorDetails.setDescription(errors.toString());
            httpStatus = HttpStatus.BAD_REQUEST;

        } else if (e instanceof ServiceVerificationException) {
            errorDetails.setType("ServiceVerificationException");
            errorDetails.setTitle("Service Verification Error");
            errorDetails.setStatus(HttpStatus.CONFLICT.value());
            errorDetails.setDetails("Service verification failed");
            errorDetails.setLocation("Service");

            errorDetails.setDescription(e.getMessage());
            httpStatus = HttpStatus.CONFLICT;

        } else {
            errorDetails.setType("Internal Server Error");
            errorDetails.setTitle("Internal Server Error");
            errorDetails.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            errorDetails.setDetails("An error occurred while processing the request");
            errorDetails.setLocation("Server");
            errorDetails.setDescription(e.getMessage());
        }

        return new ResponseEntity<>(errorDetails, httpStatus);

    }
}
