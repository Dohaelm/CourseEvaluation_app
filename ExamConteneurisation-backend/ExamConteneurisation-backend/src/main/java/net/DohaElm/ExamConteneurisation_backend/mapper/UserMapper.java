package net.DohaElm.ExamConteneurisation_backend.mapper;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import net.DohaElm.ExamConteneurisation_backend.dto.UserDto;
import net.DohaElm.ExamConteneurisation_backend.entity.Promotion;
import net.DohaElm.ExamConteneurisation_backend.entity.User;
import net.DohaElm.ExamConteneurisation_backend.entity.utils.PasswordUtil;
import net.DohaElm.ExamConteneurisation_backend.exception.ResourceNotFoundException;
import net.DohaElm.ExamConteneurisation_backend.repository.CourseRepository;
import net.DohaElm.ExamConteneurisation_backend.repository.ModuleRepository;
import net.DohaElm.ExamConteneurisation_backend.repository.PromotionRepository;
import net.DohaElm.ExamConteneurisation_backend.repository.UserRepository;
@RequiredArgsConstructor
@Service


public class UserMapper {

    private final PromotionRepository promotionRepository;

    public UserDto mapToUserDto(User user) {
    	Long promotionId=null;
    	if ( user.getPromotion()!=null) {
    		 promotionId= user.getPromotion().getId();
    	}
        return new UserDto(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            null, // Exclude password for security
            user.getRole(),
            promotionId
        );
    }

    public User mapToUser(UserDto userDto) {
        String hashedPassword = PasswordUtil.hashPassword(userDto.getPassword());
        Promotion promotion=null;
        if(userDto.getPromotionId()!=null) {
        	promotion = promotionRepository.findById(userDto.getPromotionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Promo with given id not found"));
        	
        }
        
       
        return new User(
            userDto.getId(),
            userDto.getFirstName(),
            userDto.getLastName(),
            userDto.getEmail(),
            hashedPassword,
            userDto.getRole(),
            promotion
        );
    }
}
