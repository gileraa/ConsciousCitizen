package com.pipegi.consciouscitizen.repository;

import com.pipegi.consciouscitizen.entity.SupportMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportMessageRepository extends JpaRepository<SupportMessage, Integer> {
}
