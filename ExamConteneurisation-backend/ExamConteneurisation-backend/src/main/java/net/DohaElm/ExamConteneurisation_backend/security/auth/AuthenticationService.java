package net.DohaElm.ExamConteneurisation_backend.security.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.DohaElm.ExamConteneurisation_backend.repository.UserRepository;
import net.DohaElm.ExamConteneurisation_backend.security.config.JwtService;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserRepository repository;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
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
