package net.Dohaelm.CourseEvaluation.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.LockModeType;
import net.Dohaelm.CourseEvaluation.entity.User;
import net.Dohaelm.CourseEvaluation.exception.EmailAlreadyExistsException;


public interface UserRepository extends JpaRepository<User,Long> {
	  Optional<User> findByEmail(String email);
	  boolean existsByEmail(String email);
	  @Lock(LockModeType.PESSIMISTIC_WRITE)
	  @Query("SELECT MAX(id) FROM User")
	    Long getMaxId();
	  @Transactional
	    default User saveWithNextId(User user)throws EmailAlreadyExistsException {
	        // Check if email exists before saving
	        if (existsByEmail(user.getEmail())) {
	            throw new EmailAlreadyExistsException("Email already exists: " + user.getEmail());
	        }
	        Long maxId = getMaxId();
	        System.out.println(maxId);
	        Long nextId = (maxId == null) ? 1L : maxId + 1;
	        user.setId(nextId);
	        return save(user);
	    }
	  
}
