package com.pipegi.consciouscitizen.rest;

import com.pipegi.consciouscitizen.entity.SupportMessage;
import com.pipegi.consciouscitizen.service.SupportMessageService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class SupportMessageController {

    protected final SupportMessageService service;

    public SupportMessageController(SupportMessageService service) {
        this.service = service;
    }

    @GetMapping(path = "/supportMessage/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody SupportMessage getById(@PathVariable String id) {
        return this.service.getById(Integer.valueOf(id));
    }

    @PostMapping(path = "/saveSupportMessage",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody SupportMessage save(@RequestBody SupportMessage supportMessage) {
        return this.service.save(supportMessage);
    }

    @GetMapping(path = "/supportMessages", produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<SupportMessage> getAll() {
        return this.service.getAll();
    }
}
