package com.pipegi.consciouscitizen.repository;

import com.pipegi.consciouscitizen.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
}
