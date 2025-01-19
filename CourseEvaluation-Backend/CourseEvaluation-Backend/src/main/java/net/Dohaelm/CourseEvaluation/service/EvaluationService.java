package net.Dohaelm.CourseEvaluation.service;

import java.util.List;

import net.Dohaelm.CourseEvaluation.dto.EvaluationDto;
import net.Dohaelm.CourseEvaluation.entity.Evaluation;



public interface EvaluationService {
	 Evaluation createEvaluation(EvaluationDto evaluationDto);
	 List<EvaluationDto> getEvaluationsByCourse(Long courseId);
	 List<EvaluationDto> getEvaluationsByUser(Long userId);
	void deleteEvaluation(Long evaluationId);
}
