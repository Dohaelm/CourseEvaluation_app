package net.DohaElm.ExamConteneurisation_backend.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import net.DohaElm.ExamConteneurisation_backend.entity.Promotion;
import net.DohaElm.ExamConteneurisation_backend.exception.ResourceNotFoundException;
import net.DohaElm.ExamConteneurisation_backend.repository.PromotionRepository;
import net.DohaElm.ExamConteneurisation_backend.service.PromotionService;
@Service
public class PromotionServiceImpl implements PromotionService {

    private final PromotionRepository promotionRepository;

    public PromotionServiceImpl(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    @Override
    public Promotion createPromotion(Promotion promotion) {
        return promotionRepository.save(promotion);
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
