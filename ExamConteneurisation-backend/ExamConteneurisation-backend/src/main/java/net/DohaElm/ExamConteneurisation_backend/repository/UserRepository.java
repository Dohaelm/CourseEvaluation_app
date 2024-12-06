package net.DohaElm.ExamConteneurisation_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.DohaElm.ExamConteneurisation_backend.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
	  Optional<User> findByEmail(String email);
}
