package com.pipegi.consciouscitizen.service;

import com.pipegi.consciouscitizen.entity.Actor;
import com.pipegi.consciouscitizen.repository.ActorRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class ActorService {

    protected final static String FORMAT_ERROR_MESSAGE = "No such 'Actor' with id '%d'";

    protected final ActorRepository repository;

    public ActorService(ActorRepository repository) {
        this.repository = repository;
    }

    public Actor getById(Integer id) {
        return this.repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(String.format(FORMAT_ERROR_MESSAGE, id)));
    }

    public Actor save(Actor actor) {
        return this.repository.save(actor);
    }

    public Collection<Actor> getAll() {
        return this.repository.findAll();
    }
}