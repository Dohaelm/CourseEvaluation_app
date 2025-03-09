package net.Dohaelm.CourseEvaluation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import net.Dohaelm.CourseEvaluation.entity.Promotion;
import net.Dohaelm.CourseEvaluation.service.PromotionService;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/promotions")
public class PromotionController {

    private PromotionService promotionService;

    // Create a new promotion
    @PostMapping
    public ResponseEntity<Promotion> createPromotion(@RequestBody Promotion promotion) {
        Promotion savedPromotion = promotionService.createPromotion(promotion);
        return new ResponseEntity<>(savedPromotion, HttpStatus.CREATED);
    }

    // Get a promotion by ID
    @GetMapping("/{id}")
    public ResponseEntity<Promotion> getPromotionById(@PathVariable("id") Long promotionId) {
        Promotion promotion = promotionService.getPromotionById(promotionId);
        return ResponseEntity.ok(promotion);
    }

    // Get all promotions
    @GetMapping
    public ResponseEntity<List<Promotion>> getAllPromotions() {
        List<Promotion> promotions = promotionService.getAllPromotions();
        return ResponseEntity.ok(promotions);
    }

    // Update a promotion by ID
    @PutMapping("/{id}")
    public ResponseEntity<Promotion> updatePromotion(@PathVariable("id") Long promotionId, @RequestBody Promotion updatedPromotion) {
        Promotion promotion = promotionService.updatePromotion(promotionId, updatedPromotion);
        return ResponseEntity.ok(promotion);
    }

    // Delete a promotion by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePromotion(@PathVariable("id") Long promotionId) {
        promotionService.deletePromotion(promotionId);
        return ResponseEntity.ok("Promotion deleted successfully");
    }
}
