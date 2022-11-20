package com.pipegi.consciouscitizen.service;

import com.pipegi.consciouscitizen.entity.Rubric;
import com.pipegi.consciouscitizen.repository.RubricRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class RubricService {

    protected final static String FORMAT_ERROR_MESSAGE = "No such 'Institution' with id '%d'";

    protected final RubricRepository repository;

    public RubricService(RubricRepository repository) {
        this.repository = repository;
    }

    public Collection<Rubric> getAll() {
        return this.repository.findAll();
    }
}
