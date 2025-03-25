package milan.backend.model;

import lombok.Data;

@Data
public class ImageUploadDTO {
    private String imageId;
    private String siteId;
    private String pageId;
    private String imageUrl;
    private boolean forNavBar;
    private byte[] image;
}
