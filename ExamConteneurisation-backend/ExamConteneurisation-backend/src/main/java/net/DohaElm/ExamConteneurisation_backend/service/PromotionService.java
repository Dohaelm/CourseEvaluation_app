package net.DohaElm.ExamConteneurisation_backend.service;

import java.util.List;

import net.DohaElm.ExamConteneurisation_backend.entity.Module;
import net.DohaElm.ExamConteneurisation_backend.entity.Promotion;

public interface PromotionService {
	Promotion createPromotion(Promotion promotion);

	    Promotion getPromotionById(Long promotionId);

	    List<Promotion> getAllPromotions();

	   Promotion updatePromotion(Long promotionId, Promotion updatedPromotion);

	    void deletePromotion(Long promotionId);
}
