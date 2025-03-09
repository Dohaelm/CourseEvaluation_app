package net.Dohaelm.CourseEvaluation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import net.Dohaelm.CourseEvaluation.dto.CourseRequest;
import net.Dohaelm.CourseEvaluation.dto.EvaluationDto;
import net.Dohaelm.CourseEvaluation.entity.Course;
import net.Dohaelm.CourseEvaluation.entity.Evaluation;
import net.Dohaelm.CourseEvaluation.service.CourseService;
import net.Dohaelm.CourseEvaluation.service.EvaluationService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/courses")
public class CourseController {
	 private  CourseService courseService;
	 private  EvaluationService evaluationService;
	 @PostMapping
	    public ResponseEntity<Course> createCourse(@RequestBody CourseRequest courseRequest) {
	        Course createdCourse = courseService.createCourse(courseRequest);
	        return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
	    }
	 @GetMapping("{id}")
	    public ResponseEntity<Course> getCourseById(@PathVariable("id") Long courseId) {
	        Course course = courseService.getCourseById(courseId);
	        return ResponseEntity.ok(course);
	    }
	 @GetMapping
	    public ResponseEntity<List<Course>> getAllCourses() {
	        List<Course> courses =  courseService.getAllCourses();
	        return ResponseEntity.ok(courses);
	    }
	 @PutMapping("{courseId}")
	    public ResponseEntity<Course> updateCourse(@PathVariable Long courseId, @RequestBody CourseRequest updatedCourseRequest) {
	        Course updatedCourse = courseService.updateCourse(courseId, updatedCourseRequest);
	        return ResponseEntity.ok(updatedCourse);
	    }
	 @DeleteMapping("{courseId}")
	    public ResponseEntity<String> deleteCourse(@PathVariable Long courseId) {
	        courseService.deleteCourse(courseId);
	        return ResponseEntity.ok("Course deleted successfully");
	    }
	 @PostMapping("/{courseId}/evaluations")
	    public ResponseEntity<Evaluation> createEvaluation(@RequestBody EvaluationDto evaluationDto) {
	        Evaluation createdEvaluation = evaluationService.createEvaluation(evaluationDto);
	        return new ResponseEntity<>(createdEvaluation, HttpStatus.CREATED);
	    }
	 @GetMapping("/{courseId}/evaluations")
	 public ResponseEntity<List<EvaluationDto>> getEvaluationsByCourse(@PathVariable Long courseId) {
	        List<EvaluationDto> evaluations = evaluationService.getEvaluationsByCourse(courseId);
	        return ResponseEntity.ok(evaluations);
	    }
	 @DeleteMapping("/{courseId}/evaluations/{evaluationId}")
	 public ResponseEntity<String> deleteEvaluation(@PathVariable Long evaluationId){
		 evaluationService.deleteEvaluation(evaluationId);
		 return ResponseEntity.ok("Evaluation deleted.");}
	 
	 

}
