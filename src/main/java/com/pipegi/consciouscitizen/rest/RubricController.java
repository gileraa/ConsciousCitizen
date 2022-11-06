package com.pipegi.consciouscitizen.rest;

import com.pipegi.consciouscitizen.entity.Rubric;
import com.pipegi.consciouscitizen.service.RubricService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
public class RubricController {

    protected RubricService service;

    public RubricController(RubricService service) {
        this.service = service;
    }

    @GetMapping(path="/rubrics", produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<Rubric> getAll() {
        return this.service.getAll();
    }
}
