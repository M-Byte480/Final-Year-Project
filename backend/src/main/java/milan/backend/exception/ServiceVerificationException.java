package milan.backend.exception;

import org.springframework.http.HttpStatus;

public class ServiceVerificationException extends RuntimeException {

    private final String reason;
    private final HttpStatus httpStatus;

    public ServiceVerificationException(String reason) {
        this.reason = reason;
        this.httpStatus = HttpStatus.CONFLICT;
    }

    public ServiceVerificationException(String reason, HttpStatus httpStatus) {
        this.reason = reason;
        this.httpStatus = httpStatus;
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
