package milan.backend.mapper;

import milan.backend.entity.userManagement.UserAdmin;
import milan.backend.model.dto.UserAdminDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserAdminMapper {
    UserAdminMapper INSTANCE = Mappers.getMapper(UserAdminMapper.class);

    UserAdmin fromDto(UserAdminDTO dto);
}
