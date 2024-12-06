package net.DohaElm.ExamConteneurisation_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import net.DohaElm.ExamConteneurisation_backend.dto.UserDto;
import net.DohaElm.ExamConteneurisation_backend.entity.Evaluation;
import net.DohaElm.ExamConteneurisation_backend.service.EvaluationService;
import net.DohaElm.ExamConteneurisation_backend.service.UserService;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
		
	private UserService userService;
	private EvaluationService evaluationService;
	
	@PostMapping
	public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
		UserDto savedUser=userService.createUser(userDto);
		return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}
        
	@GetMapping("{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userId){
    	UserDto userDto=userService.getUserById(userId);
    	return ResponseEntity.ok(userDto);
    }
	
	@GetMapping
	public ResponseEntity<List<UserDto>> getAllUsers(){
		List<UserDto> users=userService.getAllUsers();
		return ResponseEntity.ok(users);
		
	}
	
	@PutMapping("{userId}")
	
	public ResponseEntity<UserDto> updateUser(@PathVariable Long userId,@RequestBody UserDto updatedUser){
		UserDto userDto=userService.updateUser(userId, updatedUser);
		return ResponseEntity.ok(userDto);
	}
	@DeleteMapping("{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable Long userId){
		userService.deleteUser(userId);
		return ResponseEntity.ok("User deleted successfully");
	}
	 @GetMapping("/{userId}/evaluations")
	    public ResponseEntity<List<Evaluation>> getEvaluationsByUser(@PathVariable Long userId) {
	        List<Evaluation> evaluations = evaluationService.getEvaluationsByUser(userId);
	        return ResponseEntity.ok(evaluations);
	    }
}
