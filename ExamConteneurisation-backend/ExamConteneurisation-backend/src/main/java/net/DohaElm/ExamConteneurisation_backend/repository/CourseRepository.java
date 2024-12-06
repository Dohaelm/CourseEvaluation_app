package net.DohaElm.ExamConteneurisation_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.DohaElm.ExamConteneurisation_backend.entity.Course;

public interface CourseRepository extends JpaRepository<Course,Long> {
	
	  List<Course> findByModule_Id(Long moduleId);

}
