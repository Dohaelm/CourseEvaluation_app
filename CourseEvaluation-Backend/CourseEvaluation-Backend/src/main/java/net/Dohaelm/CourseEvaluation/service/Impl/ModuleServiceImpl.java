package net.Dohaelm.CourseEvaluation.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.Dohaelm.CourseEvaluation.entity.Module;
import net.Dohaelm.CourseEvaluation.exception.ResourceNotFoundException;
import net.Dohaelm.CourseEvaluation.repository.ModuleRepository;
import net.Dohaelm.CourseEvaluation.service.ModuleService;

@Service
@RequiredArgsConstructor
public class ModuleServiceImpl implements ModuleService{
    private final ModuleRepository moduleRepository ;

	@Override
	public Module createModule(Module module) {
		return moduleRepository.saveWithNextId(module);
	}

	@Override
	public Module getModuleById(Long moduleId) {
		  return moduleRepository.findById(moduleId)
	                .orElseThrow(() -> new ResourceNotFoundException("Module with given id not found"));
	}

	@Override
	public List<Module> getAllModules() {
		return moduleRepository.findAll();
	}


	

	@Override
	public void deleteModule(Long moduleId) {
		 Module module = moduleRepository.findById(moduleId)
	                .orElseThrow(() -> new ResourceNotFoundException("Module with given id not found"));
	        moduleRepository.delete(module);
	       
		
	}

	@Override
	public Module updateModule(Long moduleId, Module updatedModule) {
		 Module module = moduleRepository.findById(moduleId)
	                .orElseThrow(() -> new ResourceNotFoundException("Module with given id not found"));

	        if (updatedModule.getName() != null) {
	            module.setName(updatedModule.getName());
	        }

	        // You can add more fields to be updated if needed
	        return moduleRepository.save(module);
	}
	

}
