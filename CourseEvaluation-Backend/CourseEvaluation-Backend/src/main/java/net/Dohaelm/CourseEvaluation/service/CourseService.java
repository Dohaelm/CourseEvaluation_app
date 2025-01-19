package net.Dohaelm.CourseEvaluation.service;

import java.util.List;

import net.Dohaelm.CourseEvaluation.dto.CourseRequest;
import net.Dohaelm.CourseEvaluation.entity.Course;


public interface CourseService {
	Course createCourse(CourseRequest courseRequest);
	
	Course getCourseById(Long courseId);
	List<Course> getAllCourses(Long moduleId);
	Course updateCourse (Long courseId, CourseRequest updatedCourse);
	void deleteCourse(Long courseId);

	List<Course> getAllCourses();
	

}
