package com.moviesBooking.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.moviesBooking.model.BookedSeat;
import com.moviesBooking.model.Booking;
import com.moviesBooking.model.Show;

@Service
public class EmailService 
{
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    private void sendEmail(String to, String subject, String htmlContent) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.set("api-key", brevoApiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            String body = """
                {
                    "sender": {"name": "Movie Booking", "email": "boiniharika2109@gmail.com"},
                    "to": [{"email": "%s"}],
                    "subject": "%s",
                    "htmlContent": "%s"
                }
                """.formatted(to, subject, htmlContent.replace("\"", "\\\"").replace("\n", "").replace("\r", ""));

            HttpEntity<String> entity = new HttpEntity<>(body, headers);
            restTemplate.postForObject(
                "https://api.brevo.com/v3/smtp/email",
                entity,
                String.class
            );
            logger.info("✅ Email sent successfully to: {}", to);
        } catch (Exception e) {
            logger.error("❌ Email send failed: {}", e.getMessage());
        }
    }

    @Async
    public void sendVerificationEmail(String to, String verificationLink) {
        String subject = "Verify your email - Movie Booking";
        String htmlContent = "<h2>Welcome to Movie Booking!</h2>" +
            "<p>Please click the button below to verify your email address:</p>" +
            "<a href='" + verificationLink + "' style='background-color:#e50914;color:white;" +
            "padding:12px 24px;text-decoration:none;border-radius:4px;'>Verify Email</a>" +
            "<p>This link expires in 24 hours.</p>";
        sendEmail(to, subject, htmlContent);
    }

    @Async
    public void sendBookingConfirmation(String to, Booking booking) {
        try {
            Show show = booking.getShow();
            String movieTitle = show.getMovie().getTitle();
            String theaterName = show.getTheater().getName();
            String screenName = show.getScreen() != null ? show.getScreen().getName() : "N/A";
            String seats = booking.getBookedSeats().stream()
                .map(BookedSeat::getSeat)
                .map(s -> s.getSeatNumber())
                .collect(java.util.stream.Collectors.joining(", "));

            String subject = "Booking Confirmation - " + booking.getBookingReference();
            String htmlContent = "<h2>Booking Confirmed!</h2>" +
                "<p><b>Movie:</b> " + movieTitle + "</p>" +
                "<p><b>Theater:</b> " + theaterName + "</p>" +
                "<p><b>Screen:</b> " + screenName + "</p>" +
                "<p><b>Seats:</b> " + seats + "</p>" +
                "<p><b>Booking Reference:</b> " + booking.getBookingReference() + "</p>";

            sendEmail(to, subject, htmlContent);
        } catch (Exception e) {
            logger.error("❌ Booking confirmation email failed: {}", e.getMessage());
        }
    }

    @Async
    public void sendPsaawordResetEmail(String to, String resetLink) {
        String subject = "Reset your Password - Movie Booking";
        String htmlContent = "<h2>Password Reset Request</h2>" +
            "<p>Click the button below to reset your password:</p>" +
            "<a href='" + resetLink + "' style='background-color:#e50914;color:white;" +
            "padding:12px 24px;text-decoration:none;border-radius:4px;'>Reset Password</a>" +
            "<p>This link expires in 24 hours.</p>";
        sendEmail(to, subject, htmlContent);
    }
}