/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.repository;

import milan.backend.entity.userManagement.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<RoleEntity, Integer> {

    @Query("SELECT r FROM RoleEntity r")
    Optional<List<RoleEntity>> getAllRoles();

    @Query("SELECT r FROM RoleEntity r WHERE r.roleName = ?1")
    Optional<RoleEntity> getRoleByName(String roleName);
}
