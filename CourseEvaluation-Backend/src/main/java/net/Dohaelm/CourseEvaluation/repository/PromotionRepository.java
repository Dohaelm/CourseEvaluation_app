package net.Dohaelm.CourseEvaluation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.LockModeType;
import net.Dohaelm.CourseEvaluation.entity.Promotion;



public interface PromotionRepository extends JpaRepository<Promotion,Long>{
	 @Lock(LockModeType.PESSIMISTIC_WRITE)
	 @Query("SELECT MAX(id) FROM Module")
	    Long getMaxId();
	 @Transactional
	    default Promotion saveWithNextId(Promotion promotion) {
	        Long maxId = getMaxId();
	        Long nextId = (maxId == null) ? 1L : maxId + 1;
	        promotion.setId(nextId);
	        return save(promotion);
	    }

}
