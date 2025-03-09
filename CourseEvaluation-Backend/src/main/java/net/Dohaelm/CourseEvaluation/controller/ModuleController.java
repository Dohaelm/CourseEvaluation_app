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
import net.Dohaelm.CourseEvaluation.entity.Module;
import lombok.AllArgsConstructor;
import net.Dohaelm.CourseEvaluation.service.ModuleService;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/modules")
public class ModuleController {
    private final  ModuleService moduleService;

    // Create a new module
    @PostMapping
    public ResponseEntity<Module> createModule(@RequestBody Module module) {
        Module savedModule = moduleService.createModule(module);
        return new ResponseEntity<>(savedModule, HttpStatus.CREATED);
    }

    // Get a module by ID
    @GetMapping("/{id}")
    public ResponseEntity<Module> getModuleById(@PathVariable("id") Long moduleId) {
        Module module = moduleService.getModuleById(moduleId);
        return ResponseEntity.ok(module);
    }

    // Get all modules
    @GetMapping
    public ResponseEntity<List<Module>> getAllModules() {
        List<Module> modules = moduleService.getAllModules();
        return ResponseEntity.ok(modules);
    }

    // Update a module by ID
    @PutMapping("/{id}")
    public ResponseEntity<Module> updateModule(@PathVariable("id") Long moduleId, @RequestBody Module updatedModule) {
        Module module = moduleService.updateModule(moduleId, updatedModule);
        return ResponseEntity.ok(module);
    }

    // Delete a module by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteModule(@PathVariable("id") Long moduleId) {
        moduleService.deleteModule(moduleId);
        return ResponseEntity.ok("Module deleted successfully");
    }
}
