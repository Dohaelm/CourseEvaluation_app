package net.Dohaelm.CourseEvaluation.security.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.Dohaelm.CourseEvaluation.security.config.JwtService;

@RestController 
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	private final  AuthenticationService service;
	private final JwtService jwtService;
	 @PostMapping("/authenticate")
	 public ResponseEntity<AuthenticationResponse> authenticate(
			 @RequestBody AuthenticationRequest request){
		 return ResponseEntity.ok(service.authenticate(request));
		 
		 
	 }
	
	 


	
}
