import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcryptEncoderExample {

    public static void main(String[] args) {
        // Create an instance of BCryptPasswordEncoder
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // The password to be encoded (replace "yourPassword" with the actual password)
        String rawPassword = "12";  // Replace with the actual password
        
        // Generate the encoded password
        String encodedPassword = encoder.encode(rawPassword);
        
        // Print the encoded password
        System.out.println("Encoded password: " + encodedPassword);
    }
}
