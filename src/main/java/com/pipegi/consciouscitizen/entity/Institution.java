package com.pipegi.consciouscitizen.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "institution")
@Entity
@Getter
@Setter
public class Institution {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    protected int id;

    @Column(name = "name", nullable = false, length = 150)
    protected String name;

    @Column(name = "city", nullable = false, length = 100)
    protected String city;

    @Column(name = "district", length = 100)
    protected String district;

    @Column(name = "description", length = 500)
    protected String description;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rubric_id")
    protected Rubric rubric;

}
