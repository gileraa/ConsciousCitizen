package com.pipegi.consciouscitizen.repository;

import com.pipegi.consciouscitizen.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstitutionRepository extends JpaRepository<Institution, Integer> {
}
