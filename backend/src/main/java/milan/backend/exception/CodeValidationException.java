package milan.backend.exception;

import lombok.Getter;

@Getter
public class CodeValidationException extends ValidationException {

    public CodeValidationException(String what, String reason) {
        super(what, reason);
    }
}
