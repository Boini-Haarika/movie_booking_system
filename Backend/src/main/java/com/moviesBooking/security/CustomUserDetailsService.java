package com.moviesBooking.security;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.moviesBooking.model.User;
import com.moviesBooking.repository.UserRepository;
@Service
public class CustomUserDetailsService implements UserDetailsService
{
	@Autowired
   private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email)
    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

if (!user.isEnabled()) {
    throw new DisabledException("User account is not verified. Please check your email.");
}
return UserPrincipal.create(user);	
	}
}
