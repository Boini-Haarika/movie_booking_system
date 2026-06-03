package com.moviesBooking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class MoviesBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoviesBookingApplication.class, args);
	}

}
