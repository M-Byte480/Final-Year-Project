package milan.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "authentication")
public class UserPassword {
    @Id
    @Column(name = "user_id")
    private Integer id;

    @Column
    private String password;
}
