package milan.backend.exception;

public class SubRouteAlreadyInUse extends RuntimeException {
    public SubRouteAlreadyInUse(String message) {
        super(message);
    }
}
