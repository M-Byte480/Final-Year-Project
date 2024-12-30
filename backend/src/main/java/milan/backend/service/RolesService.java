/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.service;

import milan.backend.entity.userManagement.UserRoleEntity;
import milan.backend.repository.RolesRepository;
import milan.backend.repository.UserRolesRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RolesService {

    private final RolesRepository rolesRepository;

    private final UserRolesRepository userRolesRepository;

    public RolesService(RolesRepository rolesRepository, UserRolesRepository userRolesRepository) {
        this.rolesRepository = rolesRepository;
        this.userRolesRepository = userRolesRepository;
    }

    public void addRoleToUserId(UUID userId, String roleName) {
        Integer roleId = rolesRepository.getRoleByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found" + roleName))
                .getRoleId();
        userRolesRepository.save(new UserRoleEntity(userId, roleId));
    }

    public void addRoleToUserId(UUID userId, Integer roleId) {
        userRolesRepository.save(new UserRoleEntity(userId, roleId));
    }

    public void getRoles() {
        rolesRepository.getAllRoles();
    }
}
