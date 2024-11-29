package net.DohaElm.ExamConteneurisation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.DohaElm.ExamConteneurisation_backend.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {

}
