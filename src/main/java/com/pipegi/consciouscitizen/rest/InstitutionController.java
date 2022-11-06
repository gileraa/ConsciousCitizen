package com.pipegi.consciouscitizen.rest;

import com.pipegi.consciouscitizen.entity.Institution;
import com.pipegi.consciouscitizen.service.InstitutionService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class InstitutionController {

    protected final InstitutionService service;

    public InstitutionController(InstitutionService service) {
        this.service = service;
    }

    @GetMapping(path = "/institution/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Institution getById(@PathVariable String id) {
        return this.service.getById(Integer.valueOf(id));
    }

    @PostMapping(path = "/saveInstitution",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Institution save(@RequestBody Institution institution) {
        return this.service.save(institution);
    }

    @GetMapping(path = "/institutions", produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<Institution> getAll() {
        return this.service.getAll();
    }

    @GetMapping(path = "/saveInstitution/{rubricName}",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    protected @ResponseBody Collection<Institution> getAllByRubricName(@PathVariable String rubricName) {
        return this.service.getAllByRubricName(rubricName);
    }
}
