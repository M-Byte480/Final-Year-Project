package milan.backend.enums;

public enum AlreadyExists {
    COMPOSER_NAME("Composer name");

    public final String label;

    AlreadyExists(String label) {
        this.label = label;
    }
}
