package milan.backend.exception;

import lombok.Getter;

@Getter
public class ValidationException extends RuntimeException implements IValidationException {
    String what;
    String reason;

    public ValidationException(String what, String reason) {
        this.what = what;
        this.reason = reason;
    }
}
