package net.Dohaelm.CourseEvaluation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "evaluations")
public class Evaluation {
    
    @Id
    
    private Long id;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private int stars;  // Rating, from 1 to 5 stars

    @Column(length = 500)
    private String comment;  // Comment provided by the user

    @Column(nullable = false)
    private LocalDateTime createdAt;  // Date when the evaluation was submitted

    // Constructors, getters, and setters
}

