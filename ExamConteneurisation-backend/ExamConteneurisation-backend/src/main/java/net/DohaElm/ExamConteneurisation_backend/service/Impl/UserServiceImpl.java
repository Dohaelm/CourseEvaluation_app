package net.DohaElm.ExamConteneurisation_backend.service.Impl;

import java.util.List;
import java.util.stream.Collectors;

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
	private final UserMapper userMapper;
	@Override
	public UserDto createUser(UserDto userDto) {
		
		User user = userMapper.mapToUser(userDto);
		User savedUser= userRepository.save(user);
		return userMapper.mapToUserDto(savedUser);
	}
	@Override
	public UserDto getUserById(Long userId) {
		User user=userRepository.findById(userId)
		              .orElseThrow(() -> new ResourceNotFoundException("User with given id not found"));
		              return userMapper.mapToUserDto(user);
	}
	@Override
	public List<UserDto> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream().map((user)->userMapper.mapToUserDto(user))
				.collect(Collectors.toList());
				
	}
	@Override
	public UserDto updateUser(Long userId, UserDto updatedUser) {
		User user=userRepository.findById(userId).orElseThrow(
				() -> new ResourceNotFoundException("User with given id doesn't exist"));
		
		if(updatedUser.getFirstName()!=null)
		{user.setFirstName(updatedUser.getFirstName());}
		if(updatedUser.getLastName()!=null) {
		user.setLastName(updatedUser.getLastName());}
		if(updatedUser.getEmail()!=null) {
		user.setEmail(updatedUser.getEmail());}
		if(updatedUser.getRole()!=null) {
		user.setRole(updatedUser.getRole());}
		//if(updatedUser.getPromotionId()!=null) {
		//	user.setPromotion(updatedUser.getPromotion());
			
		//}
		
		User updatedUserObj=userRepository.save(user);
		return userMapper.mapToUserDto(updatedUserObj);
	}
	@Override
	public void deleteUser(Long userId) {
		
		User user=userRepository.findById(userId).orElseThrow(
				() -> new ResourceNotFoundException("User with given id doesn't exist"));
		userRepository.deleteById(userId);
	}
	@Override
	public UserDto getUserByEmail(String email) {
		User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

	    // Convert the user entity to a UserDto (you can use ModelMapper or manually map it)
	    UserDto userDto =   userMapper.mapToUserDto(user);
	    return userDto;
	} 
	
}
