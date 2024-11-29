package net.DohaElm.ExamConteneurisation_backend.mapper;

import net.DohaElm.ExamConteneurisation_backend.dto.UserDto;
import net.DohaElm.ExamConteneurisation_backend.entity.User;
import net.DohaElm.ExamConteneurisation_backend.entity.utils.PasswordUtil;

public class UserMapper {
    public static UserDto mapToUserDto(User user) {
        return new UserDto(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            null, // Exclude password for security
            user.getRole(),
            user.getPromotion()
        );
    }

    public static User mapToUser(UserDto userDto) {
        String hashedPassword = PasswordUtil.hashPassword(userDto.getPassword());
        return new User(
            userDto.getId(),
            userDto.getFirstName(),
            userDto.getLastName(),
            userDto.getEmail(),
            hashedPassword,
            userDto.getRole(),
            userDto.getPromotion()
        );
    }
}
