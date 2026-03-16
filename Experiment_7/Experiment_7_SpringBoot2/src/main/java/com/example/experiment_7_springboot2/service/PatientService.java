package com.example.experiment_7_springboot2.service;

import com.example.experiment_7_springboot2.entity.Doctor;
import com.example.experiment_7_springboot2.entity.Patient;
import com.example.experiment_7_springboot2.repository.DoctorRepository;
import com.example.experiment_7_springboot2.repository.PatientRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public PatientService(PatientRepository patientRepository, DoctorRepository doctorRepository) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public Patient savePatient(Patient patient) {
        if (patient.getDoctor() != null && patient.getDoctor().getId() != null) {
            Doctor doctor = doctorRepository.findById(patient.getDoctor().getId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + patient.getDoctor().getId()));
            patient.setDoctor(doctor);
        }
        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient updatePatient(Long id, Patient updatedPatient) {
        return patientRepository.findById(id).map(patient -> {
            patient.setName(updatedPatient.getName());
            patient.setAge(updatedPatient.getAge());
            patient.setDisease(updatedPatient.getDisease());

            if (updatedPatient.getDoctor() != null && updatedPatient.getDoctor().getId() != null) {
                Doctor doctor = doctorRepository.findById(updatedPatient.getDoctor().getId())
                        .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + updatedPatient.getDoctor().getId()));
                patient.setDoctor(doctor);
            }

            return patientRepository.save(patient);
        }).orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    public Map<String, Object> getPatientsByCursor(Long cursor, int size) {
        Pageable pageable = PageRequest.of(0, size);
        Long currentCursor = (cursor == null) ? 0L : cursor;

        Slice<Patient> slice = patientRepository.findByIdGreaterThanOrderByIdAsc(currentCursor, pageable);

        List<Patient> patients = slice.getContent();
        Long nextCursor = patients.isEmpty() ? null : patients.get(patients.size() - 1).getId();

        Map<String, Object> response = new HashMap<>();
        response.put("patients", patients);
        response.put("nextCursor", nextCursor);
        response.put("hasNext", slice.hasNext());

        return response;
    }
}