package net.DohaElm.ExamConteneurisation_backend.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.DohaElm.ExamConteneurisation_backend.entity.utils.Role;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")

public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="email", nullable=false , unique=true)
	private String email;
	
	@Column(name="password", nullable=false )
	private String password ;
	
	
	
	@Column(name="role")
	@Enumerated(EnumType.STRING)
	private Role role; 
	
	@ManyToOne
    @JoinColumn(name = "promotion_id", nullable = true) 
    private Promotion promotion;
	
	
	

}
