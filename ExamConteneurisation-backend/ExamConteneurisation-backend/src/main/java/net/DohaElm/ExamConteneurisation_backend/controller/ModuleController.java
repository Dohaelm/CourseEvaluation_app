package net.DohaElm.ExamConteneurisation_backend.controller;

import lombok.AllArgsConstructor;
import net.DohaElm.ExamConteneurisation_backend.entity.Module;
import net.DohaElm.ExamConteneurisation_backend.service.ModuleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/modules")
public class ModuleController {
    private final ModuleService moduleService;

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
