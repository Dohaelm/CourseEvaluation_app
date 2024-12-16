package net.DohaElm.ExamConteneurisation_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.DohaElm.ExamConteneurisation_backend.entity.Evaluation;

public interface EvaluationRepository extends JpaRepository<Evaluation,Long>{
	List<Evaluation> findByCourseId(Long courseId);
	List<Evaluation> findByUserId(Long userId); 
	 boolean existsByUserIdAndCourseId(Long userId, Long courseId);
}
