package net.Dohaelm.CourseEvaluation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.LockModeType;
import net.Dohaelm.CourseEvaluation.entity.Course;



public interface CourseRepository extends JpaRepository<Course,Long> {
	
	  List<Course> findByModule_Id(Long moduleId);
	  
	 
	  @Lock(LockModeType.PESSIMISTIC_WRITE)
	  @Query("SELECT MAX(id) FROM Course")
	    Long getMaxId();
	  @Transactional
	    default Course saveWithNextId(Course course) {
	        Long maxId = getMaxId();
	        Long nextId = (maxId == null) ? 1L : maxId + 1;
	        course.setId(nextId);
	        return save(course);
	    }

}
