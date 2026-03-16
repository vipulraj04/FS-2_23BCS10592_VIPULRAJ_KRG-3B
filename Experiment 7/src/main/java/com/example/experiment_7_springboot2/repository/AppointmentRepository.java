package com.example.experiment_7_springboot2.repository;

import com.example.experiment_7_springboot2.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}