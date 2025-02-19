package milan.backend.exception;

public class AlreadyExistsException extends RuntimeException {
    public AlreadyExistsException(String where, String message) {
        super(message);
    }
}
