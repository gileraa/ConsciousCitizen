package com.pipegi.consciouscitizen.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "event")
@Entity
@Getter
@Setter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    protected int id;

    @OneToOne(cascade = CascadeType.ALL, optional = false, orphanRemoval = true)
    @JoinColumn(name = "actor_id", nullable = false)
    protected Actor actor;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "rubric_id", nullable = false)
    protected Rubric rubric;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "address_id", nullable = false)
    protected Address address;

    @Column(name = "status", nullable = false)
    protected boolean status;

    @Column(name = "theme", nullable = false, length = 100)
    protected String theme;

    @Column(name = "message_text", nullable = false, length = 1000)
    protected String messageText;

    @Column(name = "date", nullable = false)
    protected LocalDate date;

    @Column(name = "result", nullable = false)
    protected boolean result;

}
