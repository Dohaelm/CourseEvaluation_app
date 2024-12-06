package net.DohaElm.ExamConteneurisation_backend.service;
import net.DohaElm.ExamConteneurisation_backend.entity.Module;

import java.util.List;

public interface ModuleService {

    Module createModule(Module module);

    Module getModuleById(Long moduleId);

    List<Module> getAllModules();

    Module updateModule(Long moduleId, Module updatedModule);

    void deleteModule(Long moduleId);
}