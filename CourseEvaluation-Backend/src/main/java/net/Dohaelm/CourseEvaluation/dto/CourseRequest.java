package net.Dohaelm.CourseEvaluation.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CourseRequest {
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long instructorId;  
    private Long moduleId;      // Just the ID of the module
    private Long promotionId;
    private int periode;
    private int semestre;
}

