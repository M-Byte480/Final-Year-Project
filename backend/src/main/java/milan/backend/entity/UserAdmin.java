package milan.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class UserAdmin {
    @Id
    private Integer userId;
}
