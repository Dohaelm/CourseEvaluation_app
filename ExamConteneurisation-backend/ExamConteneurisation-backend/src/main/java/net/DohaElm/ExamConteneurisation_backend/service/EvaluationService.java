package net.DohaElm.ExamConteneurisation_backend.service;

import java.util.List;

import net.DohaElm.ExamConteneurisation_backend.dto.EvaluationDto;
import net.DohaElm.ExamConteneurisation_backend.entity.Evaluation;

public interface EvaluationService {
	 Evaluation createEvaluation(EvaluationDto evaluationDto);
	 List<Evaluation> getEvaluationsByCourse(Long courseId);
	 List<Evaluation> getEvaluationsByUser(Long userId);
}
