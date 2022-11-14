package com.pipegi.consciouscitizen.service;

import com.pipegi.consciouscitizen.entity.SupportMessage;
import com.pipegi.consciouscitizen.repository.SupportMessageRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class SupportMessageService {

    protected final static String FORMAT_ERROR_MESSAGE = "No such 'SupportMessage' with id '%d'";

    protected final SupportMessageRepository repository;

    public SupportMessageService(SupportMessageRepository repository) {
        this.repository = repository;
    }

    public SupportMessage getById(Integer id) {
        return this.repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(String.format(FORMAT_ERROR_MESSAGE, id)));
    }

    public SupportMessage save(SupportMessage supportMessage) {
        return this.repository.save(supportMessage);
    }

    public Collection<SupportMessage> getAll() {
        return this.repository.findAll();
    }
}
