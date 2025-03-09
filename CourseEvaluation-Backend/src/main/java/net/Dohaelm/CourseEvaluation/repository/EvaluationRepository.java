package net.Dohaelm.CourseEvaluation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.LockModeType;
import net.Dohaelm.CourseEvaluation.entity.Evaluation;


public interface EvaluationRepository extends JpaRepository<Evaluation,Long>{
	List<Evaluation> findByCourseId(Long courseId);
	List<Evaluation> findByUserId(Long userId); 
	 boolean existsByUserIdAndCourseId(Long userId, Long courseId);
	 @Lock(LockModeType.PESSIMISTIC_WRITE)
	  @Query("SELECT MAX(id) FROM Evaluation")
	    Long getMaxId();
	 @Transactional
	    default Evaluation saveWithNextId(Evaluation evaluation) {
	        Long maxId = getMaxId();
	        Long nextId = (maxId == null) ? 1L : maxId + 1;
	        evaluation.setId(nextId);
	        return save(evaluation);
	    }
}
