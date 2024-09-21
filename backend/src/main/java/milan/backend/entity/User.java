package milan.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Date;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Integer id;

    @Column
    private String firstname;

    @Column
    private String surname;

    @Column
    private String email;

    @Column(name = "date_of_birth")
    private String dateOfBirth;

    @Column(name = "signed_up")
    private Date signUpTime;

}
