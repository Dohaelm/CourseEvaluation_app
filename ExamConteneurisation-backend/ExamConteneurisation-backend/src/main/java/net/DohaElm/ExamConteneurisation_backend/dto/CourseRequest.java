package net.DohaElm.ExamConteneurisation_backend.dto;

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
    private Long instructorId;  // Just the ID of the instructor
    private Long moduleId;      // Just the ID of the module
    private Long promotionId;   // Just the ID of the promotion
}

