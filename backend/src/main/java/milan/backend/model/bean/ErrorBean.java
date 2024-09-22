package milan.backend.model.bean;

import lombok.Data;

import java.util.LinkedList;

@Data
public class ErrorBean {
    String error;
    LinkedList<String> validationError;
}
