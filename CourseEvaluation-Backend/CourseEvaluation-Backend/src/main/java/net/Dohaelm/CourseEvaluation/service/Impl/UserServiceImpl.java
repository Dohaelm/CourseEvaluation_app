package net.Dohaelm.CourseEvaluation.service.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import net.Dohaelm.CourseEvaluation.dto.UserDto;
import net.Dohaelm.CourseEvaluation.entity.User;
import net.Dohaelm.CourseEvaluation.exception.ResourceNotFoundException;
import net.Dohaelm.CourseEvaluation.mapper.UserMapper;
import net.Dohaelm.CourseEvaluation.repository.UserRepository;
import net.Dohaelm.CourseEvaluation.service.UserService;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{
   
	private UserRepository userRepository;
	private final UserMapper userMapper;
	@Override
	public UserDto createUser(UserDto userDto) {
		
		
		User user = userMapper.mapToUser(userDto);
		User savedUser= userRepository.saveWithNextId(user);
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
		/* Long maxId = userRepository.getMaxId();
	        if (maxId == null) {  // If the table is empty
	            maxId = 0L;       // Treat the max ID as 0 L for Long 
	        }

	        // Reset the AUTO_INCREMENT value
	       userRepository.resetAutoIncrement(maxId + 1);*/
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
