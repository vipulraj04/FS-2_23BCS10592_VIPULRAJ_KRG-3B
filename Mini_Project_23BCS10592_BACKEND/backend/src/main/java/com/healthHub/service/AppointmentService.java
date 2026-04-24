package com.healthHub.service;

import com.healthHub.dto.PaymentRequest;
import com.healthHub.entity.Appointment;
import com.healthHub.repository.AppointmentRepository;
import com.healthHub.repository.DoctorRepository;
import com.healthHub.repository.PatientRepository;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository repo;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EmailService emailService;

    public String bookAppointment(PaymentRequest request) throws Exception {

    //ONLY VERIFY payment
        PaymentIntent intent = PaymentIntent.retrieve(request.getPaymentIntentId());
//        PatientRepository.findById()

        System.out.println("STATUS: " + intent.getStatus());

        if (!"succeeded".equals(intent.getStatus())) {
            throw new RuntimeException("Payment not successful");
        }

        // Save appointment
        Appointment appt = new Appointment();

        com.healthHub.entity.Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        com.healthHub.entity.Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        appt.setPatient(patient);
        appt.setDoctor(doctor);
        appt.setAppointmentDate(request.getDate());

        appt.setPaymentIntentId(request.getPaymentIntentId());
        appt.setPaymentStatus("SUCCESS");

        repo.save(appt);
        System.out.println("*************************APPOINTMENT SAVED:********************** ");

        emailService.sendAppointmentConfirmation(
                patient.getEmail(),
                patient.getName(),
                request.getDate().toString()
        );

        return "Appointment booked successfully";
    }


}
