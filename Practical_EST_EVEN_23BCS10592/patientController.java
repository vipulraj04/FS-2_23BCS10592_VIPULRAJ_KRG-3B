// PatientController.java
package com.example.demo.controller;

import com.example.demo.model.Patient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PatientController {

    // GET /api/patients
    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getPatients() {

        List<Patient> patients = Arrays.asList(
                new Patient(1, "Vipul", 21),
                new Patient(2, "Rahul", 25),
                new Patient(3, "Aman", 30)
        );

        return ResponseEntity.ok(patients); // 200 OK
    }

    // POST /api/patient
    @PostMapping("/patient")
    public ResponseEntity<String> createPatient(@RequestBody Patient patient) {

        // Print to console
        System.out.println("Received Patient:");
        System.out.println("ID: " + patient.getId());
        System.out.println("Name: " + patient.getName());
        System.out.println("Age: " + patient.getAge());

        return ResponseEntity.status(201).body("Patient received successfully"); // 201 CREATED
    }
}