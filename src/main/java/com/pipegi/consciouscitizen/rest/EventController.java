package com.pipegi.consciouscitizen.rest;

import com.pipegi.consciouscitizen.entity.Event;
import com.pipegi.consciouscitizen.service.EventService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.Collection;

@RestController
public class EventController {

    protected final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping(path = "/event/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Event getById(@PathVariable String id) {
        return this.service.getById(Integer.valueOf(id));
    }

    @PostMapping(path = "/saveEvent",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Event save(@RequestBody Event event) throws FileNotFoundException {
        return this.service.save(event);
    }

    @GetMapping(path = "/events", produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<Event> getAll() {
        return this.service.getAll();
    }

    @GetMapping(path = "/eventByActor/{actorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<Event> getByActorId(@PathVariable String actorId) {
        return this.service.getByActorId(actorId);
    }
}
