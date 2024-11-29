package net.DohaElm.ExamConteneurisation_backend.service.Impl;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import net.DohaElm.ExamConteneurisation_backend.dto.UserDto;
import net.DohaElm.ExamConteneurisation_backend.entity.User;
import net.DohaElm.ExamConteneurisation_backend.exception.ResourceNotFoundException;
import net.DohaElm.ExamConteneurisation_backend.mapper.UserMapper;
import net.DohaElm.ExamConteneurisation_backend.repository.UserRepository;
import net.DohaElm.ExamConteneurisation_backend.service.UserService;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{
   
	private UserRepository userRepository;
	@Override
	public UserDto createUser(UserDto userDto) {
		
		User user = UserMapper.mapToUser(userDto);
		User savedUser= userRepository.save(user);
		return UserMapper.mapToUserDto(savedUser);
	}
	@Override
	public UserDto getUserById(Long userId) {
		User user=userRepository.findById(userId)
		              .orElseThrow(() -> new ResourceNotFoundException("User with given id not found"));
		              return UserMapper.mapToUserDto(user);
	}

}
