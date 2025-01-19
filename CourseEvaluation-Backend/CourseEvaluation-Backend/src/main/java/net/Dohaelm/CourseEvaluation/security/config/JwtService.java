package net.Dohaelm.CourseEvaluation.security.config;


import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import net.Dohaelm.CourseEvaluation.entity.User;
import net.Dohaelm.CourseEvaluation.entity.utils.Role;
import net.Dohaelm.CourseEvaluation.repository.UserRepository;
@AllArgsConstructor
@Service
public class JwtService {
	private static final String SECRET_KEY= "1cab279e24103be88462f86dbe2bf0ecf06efa3a7c9452d1198ec4fc489376f11f8250dc261815d8de5f29599459fcf8a1048b47b37ef24e679de8d8c6a40ef844434b51c728e22dd1722b1eefc247ecdfcfed4f9a3cc10caca48e6790062f1b1ce2e3ac04e03ef24823b896abdf328c7b8f4c0dc0d408fc20719ec93ac7b17968402100f616d457b2c8826941407784f063aee6c1e1f9b23dcab1d7f97bd1d3c20c6185a5c482145ea91a2c09ed902b61fc649c6eb2ec65b11fd57943a85e4e24f742bad38bbc76ef00b938f58a60ab5f2ad6f3a517d46430de966aad6a3f4b44f679caed6e1741d67c452359fb8da8a00dc36ba7f845877790cb7dd75da516";
	private final UserRepository userRepository;
	
	public String extractUsername(String token) {
		
		return extractClaim(token,Claims::getSubject);
	}
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver ) {
		final Claims claims= extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	public String generateToken(UserDetails userDetails) {
	    // Create a map for the extra claims
	    Map<String, Object> extraClaims = new HashMap<>();

	    // Fetch the user and add the role to the extra claims
	    User user = userRepository.findByEmail(userDetails.getUsername())
	                              .orElseThrow();
	    extraClaims.put("role", user.getRole().toString());

	    // Delegate to the other generateToken method
	    return generateToken(extraClaims, userDetails);
	}

	public String generateToken(
			Map<String, Object> extraClaims,
			UserDetails userDetails
			) {
		Optional<User> optionalUser = userRepository.findByEmail(userDetails.getUsername());
		User user = optionalUser.orElseThrow();
		
		Role role = user.getRole();
		extraClaims.put("role", role.toString());
		return Jwts.builder().setClaims(extraClaims)
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*60))
				.signWith(getSignInKey(), SignatureAlgorithm.HS256)
				.compact();
		
	}
	private Claims extractAllClaims(String token) {
		return Jwts
				.parserBuilder()
				.setSigningKey(getSignInKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	private Key getSignInKey() {
		
		byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}
 public boolean isTokenValid(String token , UserDetails userDetails) {
	 final String username=extractUsername(token);
	 return (username.equals(userDetails.getUsername()))&& !isTokenExpired(token);
	 
 }
private boolean isTokenExpired(String token) {
	return extractExpiration(token).before(new Date());
	
}
private Date extractExpiration(String token) {
    return extractClaim(token, Claims :: getExpiration);
}
public String extractRole(String token) {
    return extractClaim(token, claims -> claims.get("role", String.class));
}
}
