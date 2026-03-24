package com.healthHub.controller;

import com.healthHub.dto.PaymentRequest;
import com.healthHub.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("http://localhost:5173")
public class AppointmentController {



    @Autowired
    private AppointmentService service;

    @PostMapping("/book-with-payment")
    public ResponseEntity<?> book(@RequestBody PaymentRequest request) {
        System.out.print("booking ********* ");
        System.out.println( request.getPaymentIntentId()+" "+request.getAmount()+" "+request.getPatientId()
                +" "+request.getDoctorId()
                +" "+request.getDate());

        try {
            String response = service.bookAppointment(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

