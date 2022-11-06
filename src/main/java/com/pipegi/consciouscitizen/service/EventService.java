package com.pipegi.consciouscitizen.service;

import com.pipegi.consciouscitizen.entity.Event;
import com.pipegi.consciouscitizen.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class EventService {

    protected final static String FORMAT_ERROR_MESSAGE = "No such 'Service' with id '%d'";

    protected final EventRepository repository;

    public EventService(EventRepository repository) {
        this.repository = repository;
    }

    public Event getById(Integer id) {
        return this.repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(String.format(FORMAT_ERROR_MESSAGE, id)));
    }

    public Event save(Event event) {
        return this.repository.save(event);
    }

    public Collection<Event> getAll() {
        return this.repository.findAll();
    }
}
