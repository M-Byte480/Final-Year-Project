package milan.backend.service;

import lombok.AllArgsConstructor;
import milan.backend.entity.ImageEntity;
import milan.backend.model.ImageUploadDTO;
import milan.backend.repository.ImageRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageEntity addImageForNavbar(ImageUploadDTO imageDTO){
        ImageEntity image =
        this.imageRepository.getBySiteIdAndForNavBar(UUID.fromString(imageDTO.getSiteId()), true).orElseGet(() -> {
            ImageEntity imageEntity = new ImageEntity();
            imageEntity.setImage(imageDTO.getImage());
            imageEntity.setId(UUID.randomUUID());
            imageEntity.setPageId(null);
            imageEntity.setImage_url(null);
            imageEntity.setSiteId(UUID.fromString(imageDTO.getSiteId()));
            imageEntity.setForNavBar(true);
            return this.imageRepository.save(imageEntity);
        });
        return this.imageRepository.save(image);
    }

    public ImageEntity addImageForPage(ImageUploadDTO imageDTO) {
        return null;
    }
}
