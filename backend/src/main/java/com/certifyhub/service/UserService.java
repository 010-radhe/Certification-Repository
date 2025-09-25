package com.certifyhub.service;

import com.certifyhub.dto.UserDTO;
import com.certifyhub.model.User;
import com.certifyhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service for user management operations
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get user by ID
     */
    public Optional<UserDTO> getUserById(String id) {
        return userRepository.findById(id)
                .map(UserDTO::fromUser);
    }

    /**
     * Get all users
     */
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDTO::fromUser)
                .collect(Collectors.toList());
    }

    /**
     * Search users by query
     */
    public List<UserDTO> searchUsers(String query) {
        return userRepository.searchUsers(query).stream()
                .map(UserDTO::fromUser)
                .collect(Collectors.toList());
    }

    /**
     * Get users by unit
     */
    public List<UserDTO> getUsersByUnit(String unit) {
        return userRepository.findByUnit(unit).stream()
                .map(UserDTO::fromUser)
                .collect(Collectors.toList());
    }

    /**
     * Get users by role
     */
    public List<UserDTO> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role).stream()
                .map(UserDTO::fromUser)
                .collect(Collectors.toList());
    }

    /**
     * Get users by skill
     */
    public List<UserDTO> getUsersBySkill(String skill) {
        return userRepository.findBySkillsContaining(skill).stream()
                .map(UserDTO::fromUser)
                .collect(Collectors.toList());
    }

    /**
     * Update user profile
     */
    public UserDTO updateUser(String id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update allowed fields
        if (userDTO.getName() != null) user.setName(userDTO.getName());
        if (userDTO.getJobTitle() != null) user.setJobTitle(userDTO.getJobTitle());
        if (userDTO.getUnit() != null) user.setUnit(userDTO.getUnit());
        if (userDTO.getBio() != null) user.setBio(userDTO.getBio());
        if (userDTO.getSkills() != null) user.setSkills(userDTO.getSkills());
        if (userDTO.getSocialLinks() != null) user.setSocialLinks(userDTO.getSocialLinks());
        if (userDTO.getAvatarUrl() != null) user.setAvatarUrl(userDTO.getAvatarUrl());
        
        user.setContactsEnabled(userDTO.isContactsEnabled());
        user.updateTimestamp();

        user = userRepository.save(user);
        return UserDTO.fromUser(user);
    }

    /**
     * Get all distinct units
     */
    public List<String> getAllUnits() {
        return userRepository.findDistinctUnits().stream()
                .map(User::getUnit)
                .distinct()
                .collect(Collectors.toList());
    }

    /**
     * Get all distinct job titles
     */
    public List<String> getAllJobTitles() {
        return userRepository.findDistinctJobTitles().stream()
                .map(User::getJobTitle)
                .distinct()
                .collect(Collectors.toList());
    }

    /**
     * Count users by unit
     */
    public long countUsersByUnit(String unit) {
        return userRepository.countByUnit(unit);
    }

    /**
     * Get managers
     */
    public List<UserDTO> getManagers() {
        return userRepository.findByRole(User.Role.MANAGER).stream()
                .map(UserDTO::fromUser)
                .collect(Collectors.toList());
    }
}
