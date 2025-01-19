package net.Dohaelm.CourseEvaluation.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
	private  final JwtAuthenticationFilter jwtAuthFilter;
	private  final  AuthenticationProvider authenticationProvider;
	@Bean 
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.csrf()
		.disable()
		.authorizeHttpRequests()
		.requestMatchers("/api/auth/authenticate","api/courses")
	
		.permitAll()
		.requestMatchers(HttpMethod.POST, "/api/users").hasAuthority("ADMIN") 
	    .requestMatchers(HttpMethod.PUT, "/api/users/**").hasAuthority("ADMIN")
		.requestMatchers(HttpMethod.POST ,"/api/courses").hasAuthority("ADMIN")
		.requestMatchers(HttpMethod.PUT,"/api/courses/**").hasAuthority("ADMIN")
		.requestMatchers(HttpMethod.DELETE,"/api/courses/**").hasAuthority("ADMIN")
		.requestMatchers(HttpMethod.POST,"/{courseId}/evaluations").hasAuthority("STUDENT")
		.requestMatchers("/error").permitAll()
		
		.anyRequest()
		.authenticated()
		.and()
	     .sessionManagement()
	     .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	     .and()
	     .authenticationProvider(authenticationProvider)
	     .addFilterBefore(jwtAuthFilter,UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}

}
