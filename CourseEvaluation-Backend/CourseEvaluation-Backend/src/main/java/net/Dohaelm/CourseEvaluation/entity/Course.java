package net.Dohaelm.CourseEvaluation.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import net.Dohaelm.CourseEvaluation.entity.utils.CourseStatus;
@Entity
@Getter
@Setter
@Table(name = "cours")
public class Course {
	  @Id
	 
	    private Long id;
        
	  @Column(name="title" , nullable=false)
	    private String title;
	  
	  @Column(name="description")
	    private String description;
	  
	  @Column(name="startDate")
	    private LocalDate startDate;
	  
	  @Column(name="endDate")
	    private LocalDate endDate;
       
	  @Column(name="periode")
	    private int periode;
	  @Column (name="semestre")
	     private int semestre;
	    
	    @ManyToOne
	    @JoinColumn(name = "module_id")  
	    private Module module;

	    
	    @ManyToOne
	    @JoinColumn(name = "instructor_id")  
	    private User instructor;
	    
        @Column(name="status")
	    @Enumerated(EnumType.STRING)
	    private CourseStatus status;
        
        
        @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        private List<Evaluation> evaluations;
        
        @ManyToOne
        @JoinColumn(name = "promotion_id", nullable = false) 
        private Promotion promotion;
        
        

}
