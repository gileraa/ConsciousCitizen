package com.pipegi.consciouscitizen.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table(name = "rubric")
@Entity
@Getter
@Setter
public class Rubric {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    protected int id;

    @Column(name = "name", nullable = false, length = 50)
    protected String name;

    @Column(name = "description", length = 150)
    protected String description;

}
