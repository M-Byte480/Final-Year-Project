package milan.backend.exception;

import milan.backend.enums.Error;
import milan.backend.model.bean.ErrorBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.LinkedList;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        ErrorBean errorBean = new ErrorBean();

        errorBean.setError(Error.VALIDATION.label);

        LinkedList<String> errors = new LinkedList<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String message = error.getDefaultMessage();
            errors.add(String.format("%s", message));
        });
        errorBean.setValidationError(errors);
        return new ResponseEntity<>(
                errorBean, HttpStatus.BAD_REQUEST
        );
    }
}
