package net.DohaElm.ExamConteneurisation_backend.service;

import java.util.List;

import net.DohaElm.ExamConteneurisation_backend.dto.UserDto;

public interface UserService {
	UserDto createUser(UserDto userDto);
	UserDto getUserById(Long userId);
	UserDto getUserByEmail(String Email);
	List<UserDto> getAllUsers();
	UserDto updateUser (Long userId, UserDto updatedUser);
	void deleteUser(Long userId);
	
	
	

}
