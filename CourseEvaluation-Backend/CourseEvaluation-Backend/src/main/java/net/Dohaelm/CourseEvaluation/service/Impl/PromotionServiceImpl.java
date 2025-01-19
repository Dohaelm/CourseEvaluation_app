package net.Dohaelm.CourseEvaluation.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import net.Dohaelm.CourseEvaluation.entity.Promotion;
import net.Dohaelm.CourseEvaluation.exception.ResourceNotFoundException;
import net.Dohaelm.CourseEvaluation.repository.PromotionRepository;
import net.Dohaelm.CourseEvaluation.service.PromotionService;


@Service
public class PromotionServiceImpl implements PromotionService {

    private final PromotionRepository promotionRepository;

    public PromotionServiceImpl(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    @Override
    public Promotion createPromotion(Promotion promotion) {
        return promotionRepository.saveWithNextId(promotion);
    }

    @Override
    public Promotion getPromotionById(Long promotionId) {
        return promotionRepository.findById(promotionId)
                .orElseThrow(() -> new ResourceNotFoundException("Promotion with given id not found"));
    }

    @Override
    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    @Override
    public void deletePromotion(Long promotionId) {
        Promotion promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new ResourceNotFoundException("Promotion with given id not found"));
        promotionRepository.delete(promotion);
      /*  Long maxId = promotionRepository.getMaxId();
        if (maxId == null) {  // If the table is empty
            maxId = 0L;       // Treat the max ID as 0 L for Long
        }

        // Reset the AUTO_INCREMENT value
      promotionRepository.resetAutoIncrement(maxId + 1);*/
    }

    @Override
    public Promotion updatePromotion(Long promotionId, Promotion updatedPromotion) {
        Promotion promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new ResourceNotFoundException("Promotion with given id not found"));

        if (updatedPromotion.getName() != null) {
            promotion.setName(updatedPromotion.getName());
        }

        // Add more fields to be updated if necessary
        return promotionRepository.save(promotion);
    }
}
