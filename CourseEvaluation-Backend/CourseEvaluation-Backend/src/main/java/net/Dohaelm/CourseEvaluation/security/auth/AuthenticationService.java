package net.Dohaelm.CourseEvaluation.security.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.Dohaelm.CourseEvaluation.repository.UserRepository;
import net.Dohaelm.CourseEvaluation.security.config.JwtService;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserRepository repository;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	public final AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
		        new UsernamePasswordAuthenticationToken(
		            request.getEmail(),
		            request.getPassword()
		        )
		    );
		    var user = repository.findByEmail(request.getEmail())
		        .orElseThrow();
		    var jwtToken = jwtService.generateToken(user);
		   
		  return AuthenticationResponse.builder()
				  .token(jwtToken)
				  .build();
	}

}
