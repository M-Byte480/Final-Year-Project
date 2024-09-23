package milan.backend.exception;

import lombok.Getter;

@Getter
public class ExpiredException extends ValidationException {
    public ExpiredException(String what, String reason) {
        super(what, reason);
    }
}
