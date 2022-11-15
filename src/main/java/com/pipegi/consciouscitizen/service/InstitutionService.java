package com.pipegi.consciouscitizen.service;

import com.pipegi.consciouscitizen.entity.Institution;
import com.pipegi.consciouscitizen.repository.InstitutionRepository;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class InstitutionService {

    protected final static String FORMAT_ERROR_MESSAGE = "No such 'Institution' with id '%d'";

    protected final InstitutionRepository repository;

    protected String internalRubricName = "";

    public InstitutionService(InstitutionRepository repository) {
        this.repository = repository;
    }

    public Institution getById(Integer id) {
        return this.repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(String.format(FORMAT_ERROR_MESSAGE, id)));
    }

    public Institution save(Institution actor) {
        return this.repository.save(actor);
    }

    public Collection<Institution> getAll() {
        return this.repository.findAll();
    }

    public Collection<Institution> getAllByRubricName(String rubricName) {
        internalRubricName = rubricName;

        return this.repository.findAll().stream()
                .filter(this::rubricFilter)
                .collect(Collectors.toSet());
    }

    protected boolean rubricFilter(Institution institution) {
        if (Strings.isBlank(internalRubricName)) {
            return true;
        }

        return institution.getRubric().getName().equals(internalRubricName);
    }
}
