package net.DohaElm.ExamConteneurisation_backend.service.Impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import net.DohaElm.ExamConteneurisation_backend.dto.EvaluationDto;
import net.DohaElm.ExamConteneurisation_backend.entity.Course;
import net.DohaElm.ExamConteneurisation_backend.entity.Evaluation;
import net.DohaElm.ExamConteneurisation_backend.entity.User;
import net.DohaElm.ExamConteneurisation_backend.entity.utils.CourseStatus;
import net.DohaElm.ExamConteneurisation_backend.entity.utils.Role;
import net.DohaElm.ExamConteneurisation_backend.exception.ResourceNotFoundException;
import net.DohaElm.ExamConteneurisation_backend.repository.CourseRepository;
import net.DohaElm.ExamConteneurisation_backend.repository.EvaluationRepository;
import net.DohaElm.ExamConteneurisation_backend.repository.UserRepository;
import net.DohaElm.ExamConteneurisation_backend.service.EvaluationService;

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
        return evaluationRepository.save(evaluation);
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

}
