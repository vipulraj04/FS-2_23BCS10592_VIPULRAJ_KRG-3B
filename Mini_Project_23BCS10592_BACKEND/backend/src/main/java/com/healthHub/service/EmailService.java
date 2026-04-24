package com.healthHub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendAppointmentConfirmation(String toEmail, String patientName, String date) {
    System.out.println("this method is working");
        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Appointment Confirmation");
            message.setText(
                    "Hello " + patientName + "\n\n" +
                            "Your appointment is booked successfully.\n" +
                            "Date: " + date + "\n\n" +
                            "Thanks for using HealthHub"
            );

            try {
                javaMailSender.send(message);
                System.out.println("EMAIL SENT SUCCESSFULLY");
            } catch (Exception e) {
                System.out.println("EMAIL FAILED: " + e.getMessage());
                e.printStackTrace();
            }

            System.out.println("EMAIL SENT SUCCESSFULLY");

        } catch (Exception e) {
            System.out.println("EMAIL FAILED: " + e.getMessage());
            e.printStackTrace();
        }
    }
}