package com.pipegi.consciouscitizen.rest;

import com.pipegi.consciouscitizen.entity.Actor;
import com.pipegi.consciouscitizen.service.ActorService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class ActorController {

    protected final ActorService service;

    public ActorController(ActorService service) {
        this.service = service;
    }

    @GetMapping(path = "/actor/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Actor getById(@PathVariable String id) {
        return this.service.getById(Integer.valueOf(id));
    }

    @PostMapping(path = "/saveActor",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Actor save(@RequestBody Actor actor) {
        return this.service.save(actor);
    }

    @GetMapping(path = "/actors", produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<Actor> getAll() {
        return this.service.getAll();
    }
}
