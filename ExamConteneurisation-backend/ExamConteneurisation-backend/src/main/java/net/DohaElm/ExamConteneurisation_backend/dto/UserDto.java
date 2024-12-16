package net.DohaElm.ExamConteneurisation_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.DohaElm.ExamConteneurisation_backend.entity.Promotion;
import net.DohaElm.ExamConteneurisation_backend.entity.utils.Role;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
      private Long id;
	
	
	private String firstName;
	
	
	private String lastName;
	
	
	private String email;
	
	private String password;
	
	
	private Role role; 
	
	
    private Long promotionId;
	
	
	
}
