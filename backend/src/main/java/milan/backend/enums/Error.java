package milan.backend.enums;

public enum Error {
    VALIDATION("Validation");

    public final String label;

    Error(String label) {
        this.label = label;
    }

    public String toString(){
        return label;
    }
}
