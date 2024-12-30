/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.entity.resources;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "image_resources")
public class ImageResourceEntity {
    @Id
    @Column(name = "id")
    private UUID imageId;

    private UUID uploaderId;

    private String filename;

    private String file;
}
