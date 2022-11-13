package com.pipegi.consciouscitizen.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "support_message")
@Entity
@Getter
@Setter
public class SupportMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    protected int id;

    @Column(name = "user_id", nullable = false)
    protected int userId;

    @Column(name = "user_email", nullable = false)
    protected String userEmail;

    @Column(name = "is_resolved")
    protected Boolean isResolved;

    @Column(name = "message", nullable = false, length = 3000)
    protected String message;

}