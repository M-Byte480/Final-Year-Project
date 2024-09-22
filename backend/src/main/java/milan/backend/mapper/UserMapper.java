package milan.backend.mapper;

import milan.backend.entity.User;
import milan.backend.model.dto.RegistrationDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User fromDto(RegistrationDTO dto);
}
