package net.DohaElm.ExamConteneurisation_backend.service;

import net.DohaElm.ExamConteneurisation_backend.dto.UserDto;

public interface UserService {
	UserDto createUser(UserDto userDto);
	UserDto getUserById(Long userId);
	
	
	

}
