package net.Dohaelm.CourseEvaluation.service.Impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.Dohaelm.CourseEvaluation.dto.CourseRequest;
import net.Dohaelm.CourseEvaluation.entity.Course;
import net.Dohaelm.CourseEvaluation.entity.Module;
import net.Dohaelm.CourseEvaluation.entity.Promotion;
import net.Dohaelm.CourseEvaluation.entity.User;
import net.Dohaelm.CourseEvaluation.entity.utils.CourseStatus;
import net.Dohaelm.CourseEvaluation.exception.ResourceNotFoundException;
import net.Dohaelm.CourseEvaluation.repository.CourseRepository;
import net.Dohaelm.CourseEvaluation.repository.ModuleRepository;
import net.Dohaelm.CourseEvaluation.repository.PromotionRepository;
import net.Dohaelm.CourseEvaluation.repository.UserRepository;
import net.Dohaelm.CourseEvaluation.service.CourseService;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final UserRepository userRepository;
    private final PromotionRepository promotionRepository;

    @Override
    public Course createCourse(CourseRequest courseRequest) {
        // Fetch related entities by their IDs
        User instructor = userRepository.findById(courseRequest.getInstructorId())
            .orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));

        Module module = moduleRepository.findById(courseRequest.getModuleId())
            .orElseThrow(() -> new ResourceNotFoundException("Module not found"));

        Promotion promotion = promotionRepository.findById(courseRequest.getPromotionId())
            .orElseThrow(() -> new ResourceNotFoundException("Promotion not found"));

        // Create a new course and set the related entities
        Course course = new Course();
        course.setTitle(courseRequest.getTitle());
        course.setDescription(courseRequest.getDescription());
        course.setStartDate(courseRequest.getStartDate());
        course.setEndDate(courseRequest.getEndDate());
        course.setInstructor(instructor);  // Set the instructor
        course.setModule(module);          // Set the module
        course.setPromotion(promotion);
        course.setPeriode(courseRequest.getPeriode());    
        course.setSemestre(courseRequest.getSemestre());
        
        course.setStatus(determineCourseStatus(course.getStartDate(), course.getEndDate()));
        // Save the course to the repository
        return courseRepository.saveWithNextId(course);
    }


    @Override
    public Course getCourseById(Long courseId) {
        // Fetch the course by ID, or throw an exception if not found
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course with given id not found"));
    }

    @Override
    public List<Course> getAllCourses(Long moduleId) {
        // Fetch all courses for a specific module by module ID
        return courseRepository.findByModule_Id(moduleId); // Assuming this method exists in the repository
    }

    @Override
    public Course updateCourse(Long courseId, CourseRequest courseRequest) {
        // Fetch the course by ID
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course with given id doesn't exist"));

        // Update fields conditionally based on non-null values from the CourseRequest DTO

        if (courseRequest.getTitle() != null) {
            course.setTitle(courseRequest.getTitle());
        }
        if (courseRequest.getDescription() != null) {
            course.setDescription(courseRequest.getDescription());
        }
        if (courseRequest.getStartDate() != null) {
            course.setStartDate(courseRequest.getStartDate());
        }
        if (courseRequest.getEndDate() != null) {
            course.setEndDate(courseRequest.getEndDate());
        }
      

        // Handling related entities using IDs (if provided)
        if (courseRequest.getModuleId() != null && courseRequest.getModuleId() != null) {
            Module module = moduleRepository.findById(courseRequest.getModuleId())
                    .orElseThrow(() -> new ResourceNotFoundException("Module with given id doesn't exist"));
            course.setModule(module);
        }

        if (courseRequest.getInstructorId() != null && courseRequest.getInstructorId() != null) {
            User instructor = userRepository.findById(courseRequest.getInstructorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Instructor with given id doesn't exist"));
            course.setInstructor(instructor);
        }

        if (courseRequest.getPromotionId() != null && courseRequest.getPromotionId() != null) {
            Promotion promotion = promotionRepository.findById(courseRequest.getPromotionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Promotion with given id doesn't exist"));
            course.setPromotion(promotion);
        }
        course.setStatus(determineCourseStatus(course.getStartDate(), course.getEndDate()));

        // Save the updated course and return it
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long courseId) {
        // Find the course by ID and delete it if it exists
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course with given id doesn't exist"));

        courseRepository.delete(course);
       /* Long maxId = courseRepository.getMaxId();
        if (maxId == null) {  // If the table is empty
            maxId = 0L;       // Treat the max ID as 0 L for Long
        }

        // Reset the AUTO_INCREMENT value
       courseRepository.resetAutoIncrement(maxId + 1);*/
    }
    private CourseStatus determineCourseStatus(LocalDate startDate, LocalDate endDate) {
        LocalDate currentDate = LocalDate.now();

        if (currentDate.isBefore(startDate)) {
            return CourseStatus.PENDING;  // Course hasn't started yet
        } else if (currentDate.isAfter(endDate)) {
            return CourseStatus.COMPLETED;  // Course has ended
        } else {
            return CourseStatus.ONGOING;  // Course is still ongoing (today is between start and end date)
        }
    }


	@Override
	public List<Course> getAllCourses() {
		return courseRepository.findAll();
	}

}
