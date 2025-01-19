package net.Dohaelm.CourseEvaluation.beans;

import net.Dohaelm.CourseEvaluation.entity.User;
import net.Dohaelm.CourseEvaluation.entity.utils.Role;
import net.Dohaelm.CourseEvaluation.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
@Component
public class AdminInitializer {

    @Bean
    public CommandLineRunner initializeAdminUser(UserRepository userRepository) {
        return args -> {
            // Check if the admin already exists
            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
                User admin = new User();
                admin.setId(1L);
                admin.setFirstName("admin");
                admin.setLastName("admin");
                admin.setEmail("admin@gmail.com");

                // You should use a password encoder for production use
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                admin.setPassword(encoder.encode("adminpassword"));
                admin.setRole(Role.ADMIN);

                // Save the user to the database
                userRepository.save(admin);

                System.out.println("Admin user created!");
            }
        };
    }
}
