package com.example.experiment_7_springboot2.repository;

import com.example.experiment_7_springboot2.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}