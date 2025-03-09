package net.Dohaelm.CourseEvaluation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationDto {
    private Long userId;       // User ID, validated to ensure the user is a student
    private Long courseId;     // Course ID, validated to ensure course status is "COMPLETED"
    private int stars;         // Mandatory rating, must be between 1 and 5
    private String comment;    // Optional commentary
}
