/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.service;

import milan.backend.entity.site.SiteManagerEntity;
import milan.backend.entity.site.SiteEntity;
import milan.backend.model.dto.SiteDTO;
import milan.backend.repository.SiteManagerRepository;
import milan.backend.repository.SiteRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SiteManagerService {
    private final SiteManagerRepository siteManagerRepository;
    private final SiteRepository siteRepository;

    public SiteManagerService(SiteManagerRepository siteManagerRepository, SiteRepository siteRepository) {
        this.siteManagerRepository = siteManagerRepository;
        this.siteRepository = siteRepository;
    }

    public SiteManagerEntity addSite(UUID userId, String name){
        UUID siteId = UUID.randomUUID();

        // Create Site
        SiteEntity siteEntity = new SiteEntity();
        siteEntity.setId(siteId);
        siteRepository.save(siteEntity);

        // Map site to user
        SiteManagerEntity siteManagerEntity = new SiteManagerEntity();
        siteManagerEntity.setSiteId(siteId);
        siteManagerEntity.setUserId(userId);
        siteManagerEntity.setSiteName(name);
        siteManagerEntity = siteManagerRepository.save(siteManagerEntity);

        return siteManagerEntity;
    }

    public Set<SiteDTO> getSites(String userId) {
        return getSites(UUID.fromString(userId));
    }

    public Set<SiteDTO> getSites(UUID userId) {
        return siteManagerRepository.getAllByUserId(userId)
                .orElse(
                        new ArrayList<>()
                ).stream()
                .map(site -> new SiteDTO(site.getSiteId(), site.getSiteName(), null))
                .collect(Collectors.toSet());
    }

    public SiteManagerEntity getSiteByUserAndSiteId(UUID userId, UUID siteId) {
        return this.siteManagerRepository.getSiteManagerEntitiesBySiteIdAndUserId(siteId, userId)
                .orElseThrow(() -> new RuntimeException("Site not found"));
    }

    public void deleteUserSite(SiteManagerEntity siteEntity) {
        siteManagerRepository.delete(siteEntity);
        siteRepository.deleteById(siteEntity.getSiteId());
    }
}
