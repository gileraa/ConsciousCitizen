package com.pipegi.consciouscitizen.service;

import com.pipegi.consciouscitizen.entity.Actor;
import com.pipegi.consciouscitizen.entity.Event;
import com.pipegi.consciouscitizen.entity.Rubric;
import com.pipegi.consciouscitizen.repository.ActorRepository;
import com.pipegi.consciouscitizen.repository.EventRepository;
import com.pipegi.consciouscitizen.repository.RubricRepository;
import lombok.SneakyThrows;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    protected final static String FORMAT_ERROR_MESSAGE = "No such 'Service' with id '%d'";

    protected final EventRepository repository;
    protected final ActorRepository actorRepository;
    protected final RubricRepository rubricRepository;

    public EventService(EventRepository repository,
                        ActorRepository actorRepository,
                        RubricRepository rubricRepository) {
        this.repository = repository;
        this.actorRepository = actorRepository;
        this.rubricRepository = rubricRepository;
    }

    public Event getById(Integer id) {
        Event event = this.repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(String.format(FORMAT_ERROR_MESSAGE, id)));

        loadImages(event);

        return event;
    }

    public Event save(Event event) throws FileNotFoundException {
        saveImages(event);

        int actorId = event.getActor().getId();
        event.setActor(loadActorById(actorId));

        int rubricId = event.getRubric().getId();
        event.setRubric(loadRubricById(rubricId));

        return this.repository.save(event);
    }

    protected Actor loadActorById(int actorId) {
        return this.actorRepository.findById(actorId)
                .orElse(null);
    }

    protected Rubric loadRubricById(int rubricId) {
        return this.rubricRepository.findById(rubricId)
                .orElse(null);
    }


    public Collection<Event> getAll() {
        List<Event> all = this.repository.findAll();
        all.forEach(this::loadImages);
        return all;
    }

    public Collection<Event> getByActorId(String actorId) {
        int intId = Integer.parseInt(actorId);
        return this.repository.findAll().stream()
                .filter(event -> event.getActor().getId() == intId)
                .collect(Collectors.toSet());
    }

    public Event changeEventStatusById(Integer id) {
        Event event = this.repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(String.format(FORMAT_ERROR_MESSAGE, id)));
        boolean status = event.isStatus();

        event.setStatus(!status);

        return this.repository.save(event);
    }

    protected void saveImages(Event event) throws FileNotFoundException {
        if (Strings.isNotBlank(event.getImage())) {

            String image1FileName = Event.class.getSimpleName() + "_" + event.getId() + "_1";
            String image1Base64 = event.getImage();
            PrintWriter out = new PrintWriter(image1FileName + ".txt");

            out.println(image1Base64);
            out.close();

            event.setImage(image1FileName);
        }

        if (Strings.isNotBlank(event.getImage2())) {

            String image2FileName = Event.class.getSimpleName() + "_" + event.getId() + "_2";
            String image2Base64 = event.getImage2();
            PrintWriter out = new PrintWriter(image2FileName + ".txt");

            out.println(image2Base64);
            out.close();

            event.setImage2(image2FileName);
        }
    }

    @SneakyThrows
    protected void loadImages(Event event) {
        if (Strings.isNotBlank(event.getImage())) {
            String image1FileName = Event.class.getSimpleName() + "_" + event.getId() + "_1.txt";

            String content = new String(Files.readAllBytes(Paths.get(image1FileName)));

            event.setImage(content);
        }

        if (Strings.isNotBlank(event.getImage2())) {
            String image2FileName = Event.class.getSimpleName() + "_" + event.getId() + "_2.txt";

            String content = new String(Files.readAllBytes(Paths.get(image2FileName)));

            event.setImage(content);
        }
    }
}
