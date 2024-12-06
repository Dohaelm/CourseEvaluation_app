package net.DohaElm.ExamConteneurisation_backend.service;

import java.util.List;

import net.DohaElm.ExamConteneurisation_backend.dto.CourseRequest;
import net.DohaElm.ExamConteneurisation_backend.entity.Course;

public interface CourseService {
	Course createCourse(CourseRequest courseRequest);
	
	Course getCourseById(Long courseId);
	List<Course> getAllCourses(Long moduleId);
	Course updateCourse (Long courseId, CourseRequest updatedCourse);
	void deleteCourse(Long courseId);

	List<Course> getAllCourses();
	

}
