package dev.royaumendi.talentmap.service;

import dev.royaumendi.talentmap.dto.LoginRequest;
import dev.royaumendi.talentmap.dto.LoginResponse;
import dev.royaumendi.talentmap.dto.RegisterRequest;
import dev.royaumendi.talentmap.entity.AvailabilityStatus;
import dev.royaumendi.talentmap.entity.Role;
import dev.royaumendi.talentmap.entity.TalentProfile;
import dev.royaumendi.talentmap.entity.User;
import dev.royaumendi.talentmap.repository.TalentProfileRepository;
import dev.royaumendi.talentmap.repository.UserRepository;
import dev.royaumendi.talentmap.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TalentProfileRepository talentProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public LoginResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRoles(Set.of(Role.USER));
        
        User savedUser = userRepository.save(user);

        TalentProfile profile = new TalentProfile();
        profile.setUser(savedUser);
        profile.setFirstName(request.firstName());
        profile.setLastName(request.lastName());
        profile.setAvailabilityStatus(AvailabilityStatus.NOT_LOOKING);
        profile.setVerified(false);
        
        talentProfileRepository.save(profile);

        String token = jwtTokenProvider.createToken(savedUser.getId(), savedUser.getEmail());
        
        return new LoginResponse(token, savedUser.getId(), savedUser.getEmail(), savedUser.getRoles());
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail());
        
        return new LoginResponse(token, user.getId(), user.getEmail(), user.getRoles());
    }
}
