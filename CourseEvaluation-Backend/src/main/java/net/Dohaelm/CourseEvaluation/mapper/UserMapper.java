package net.Dohaelm.CourseEvaluation.mapper;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.Dohaelm.CourseEvaluation.dto.UserDto;
import net.Dohaelm.CourseEvaluation.entity.Promotion;
import net.Dohaelm.CourseEvaluation.entity.User;
import net.Dohaelm.CourseEvaluation.entity.utils.PasswordUtil;
import net.Dohaelm.CourseEvaluation.exception.ResourceNotFoundException;
import net.Dohaelm.CourseEvaluation.repository.PromotionRepository;
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
