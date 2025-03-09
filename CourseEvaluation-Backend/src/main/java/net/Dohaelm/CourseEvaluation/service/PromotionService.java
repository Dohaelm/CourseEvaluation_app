package net.Dohaelm.CourseEvaluation.service;

import java.util.List;

import net.Dohaelm.CourseEvaluation.entity.Promotion;

public interface PromotionService {
	Promotion createPromotion(Promotion promotion);

	    Promotion getPromotionById(Long promotionId);

	    List<Promotion> getAllPromotions();

	   Promotion updatePromotion(Long promotionId, Promotion updatedPromotion);

	    void deletePromotion(Long promotionId);
}
