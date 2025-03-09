package net.Dohaelm.CourseEvaluation.security.config;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private  final JwtService jwtService;
	private final UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
throws ServletException, IOException {

final String authHeader = request.getHeader("Authorization");
final String jwt;
final String userEmail;

if (authHeader == null || !authHeader.startsWith("Bearer ")) {
filterChain.doFilter(request, response);
return;
}

// Extract the JWT from the Authorization header
jwt = authHeader.substring(7);
userEmail = jwtService.extractUsername(jwt);

if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

if (jwtService.isTokenValid(jwt, userDetails)) {
// Extract the role(s) from the JWT
String role = jwtService.extractRole(jwt);  // You may want to implement this method

// Create authorities from the role
Collection<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));

// Create an authentication token with the role(s)
UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
userDetails, null, authorities);

authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

// Set the authentication in the SecurityContext
SecurityContextHolder.getContext().setAuthentication(authToken);
}
}

filterChain.doFilter(request, response);
}

		
		
	}


