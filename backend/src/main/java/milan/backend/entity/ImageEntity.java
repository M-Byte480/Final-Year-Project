package milan.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

/*
    id uuid,
    site_id uuid,
    page_id uuid,
    image bytea,
    image_url VARCHAR(255),
    for_nav_bar BOOLEAN DEFAULT FALSE,
 */
@Entity
@Table(name = "images")
@Data
public class ImageEntity {
    @Id
    private UUID id;

    private UUID siteId;
    private UUID pageId;

//    @Column(name = "image", columnDefinition="bytea")
    private byte[] image;
    private String image_url;
    private boolean forNavBar;
}
