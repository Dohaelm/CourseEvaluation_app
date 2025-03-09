package net.Dohaelm.CourseEvaluation.service;


import java.util.List;
import net.Dohaelm.CourseEvaluation.entity.Module;

public interface ModuleService {

    Module createModule(Module module);

    Module getModuleById(Long moduleId);

    List<Module> getAllModules();

    Module updateModule(Long moduleId, Module updatedModule);

    void deleteModule(Long moduleId);
}