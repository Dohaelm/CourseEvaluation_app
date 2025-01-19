package net.Dohaelm.CourseEvaluation.service.Impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import net.Dohaelm.CourseEvaluation.dto.EvaluationDto;
import net.Dohaelm.CourseEvaluation.entity.Course;
import net.Dohaelm.CourseEvaluation.entity.Evaluation;
import net.Dohaelm.CourseEvaluation.entity.Module;
import net.Dohaelm.CourseEvaluation.entity.User;
import net.Dohaelm.CourseEvaluation.entity.utils.CourseStatus;
import net.Dohaelm.CourseEvaluation.entity.utils.Role;
import net.Dohaelm.CourseEvaluation.exception.ResourceNotFoundException;
import net.Dohaelm.CourseEvaluation.repository.CourseRepository;
import net.Dohaelm.CourseEvaluation.repository.EvaluationRepository;
import net.Dohaelm.CourseEvaluation.repository.UserRepository;
import net.Dohaelm.CourseEvaluation.service.EvaluationService;

@Service
@AllArgsConstructor
public class EvaluationServiceImpl implements EvaluationService {
    private final EvaluationRepository evaluationRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Override
    public Evaluation createEvaluation(EvaluationDto evaluationDto) {
        // Validate user ID
        User user = userRepository.findById(evaluationDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User with given ID does not exist"));
        if (!user.getRole().equals(Role.STUDENT)) {
            throw new IllegalArgumentException("Only students can submit evaluations");
        }

        // Validate course ID
        Course course = courseRepository.findById(evaluationDto.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course with given ID does not exist"));
        if (!course.getStatus().equals(CourseStatus.COMPLETED)) {
            throw new IllegalArgumentException("Evaluations can only be submitted for completed courses");
        }

        // Check if the user has already evaluated this course
        boolean alreadyEvaluated = evaluationRepository.existsByUserIdAndCourseId(
                evaluationDto.getUserId(), evaluationDto.getCourseId());
        if (alreadyEvaluated) {
            throw new IllegalArgumentException("User has already evaluated this course");
        }

        // Validate stars
        if (evaluationDto.getStars() < 1 || evaluationDto.getStars() > 5) {
            throw new IllegalArgumentException("Stars must be between 1 and 5");
        }

        // Map EvaluationDto to Evaluation entity
        Evaluation evaluation = new Evaluation();
        evaluation.setUser(user);
        evaluation.setCourse(course);
        evaluation.setStars(evaluationDto.getStars());
        evaluation.setComment(evaluationDto.getComment());
        evaluation.setCreatedAt(LocalDateTime.now());

        // Save and return
        return evaluationRepository.saveWithNextId(evaluation);
    }


	 @Override
	    public List<EvaluationDto> getEvaluationsByCourse(Long courseId) {
	        return evaluationRepository.findByCourseId(courseId)
	                .stream()
	                .map(this::mapToDto)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public List<EvaluationDto> getEvaluationsByUser(Long userId) {
	        return evaluationRepository.findByUserId(userId)
	                .stream()
	                .map(this::mapToDto)
	                .collect(Collectors.toList());
	    }

	    // Helper method to map Evaluation entity to EvaluationDto
	    private EvaluationDto mapToDto(Evaluation evaluation) {
	        return new EvaluationDto(
	                evaluation.getUser().getId(),
	                evaluation.getCourse().getId(),
	                evaluation.getStars(),
	                evaluation.getComment()
	        );
	    }
	    @Override
		public void deleteEvaluation(Long evaluationId) {
			 Evaluation evaluation = evaluationRepository.findById(evaluationId)
		                .orElseThrow(() -> new ResourceNotFoundException("Evaluation with given id not found"));
		        evaluationRepository.delete(evaluation);
		       
			
		}

}
