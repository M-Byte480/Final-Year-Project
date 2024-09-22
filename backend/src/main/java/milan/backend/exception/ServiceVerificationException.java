package milan.backend.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

@Slf4j
public class ServiceVerificationException extends RuntimeException {

    private final String reason;
    private final HttpStatus httpStatus;

    public ServiceVerificationException(String reason) {
        this.reason = reason;
        this.httpStatus = HttpStatus.CONFLICT;
        log.error(reason);
    }

    public ServiceVerificationException(String reason, HttpStatus httpStatus) {
        this.reason = reason;
        this.httpStatus = httpStatus;
        log.error(reason);
    }

    public String getReason() {
        return reason;
    }

    public String getMessage() {
        return reason;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
