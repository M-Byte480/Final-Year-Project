package milan.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "authentication")
public class UserPassword {
    @Id
    @Column(name = "user_id")
    private Integer id;

    @Column
    private String password;
}
