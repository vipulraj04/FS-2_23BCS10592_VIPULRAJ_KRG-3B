package com.healthHub.config;

import com.healthHub.entity.Doctor;
import com.healthHub.entity.Patient;
import com.healthHub.repository.DoctorRepository;
import com.healthHub.repository.PatientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(DoctorRepository doctorRepository, PatientRepository patientRepository) {
        return args -> {
            if (doctorRepository.count() == 0) {
                Doctor d1 = new Doctor();
                d1.setName("Dr. John Doe");
                d1.setSpecialization("General Physician");
                d1.setExperience(10);

                Doctor d2 = new Doctor();
                d2.setName("Dr. Jane Smith");
                d2.setSpecialization("Cardiologist");
                d2.setExperience(15);

                doctorRepository.saveAll(List.of(d1, d2));
                System.out.println("Seeded Doctor data.");
            }

            if (patientRepository.count() == 0) {
                Patient p1 = new Patient();
                p1.setName("Alice Johnson");
                p1.setAge(30);
                p1.setDisease("Fever");
                p1.setEmail("alice@example.com");

                Patient p2 = new Patient();
                p2.setName("Bob Williams");
                p2.setAge(45);
                p2.setDisease("Hypertension");
                p2.setEmail("bob@example.com");

                patientRepository.saveAll(List.of(p1, p2));
                System.out.println("Seeded Patient data.");
            }
        };
    }
}
