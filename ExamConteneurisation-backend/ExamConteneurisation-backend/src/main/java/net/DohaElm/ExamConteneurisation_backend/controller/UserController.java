package net.DohaElm.ExamConteneurisation_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import net.DohaElm.ExamConteneurisation_backend.dto.UserDto;
import net.DohaElm.ExamConteneurisation_backend.service.UserService;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
		
	private UserService userService;
	
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
}
