package com.example.experiment_7_springboot2.repository;

import com.example.experiment_7_springboot2.entity.Patient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Slice<Patient> findByIdGreaterThanOrderByIdAsc(Long id, Pageable pageable);
}