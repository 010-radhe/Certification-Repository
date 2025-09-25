package com.certifyhub.dto;

import com.certifyhub.model.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * DTO for User entity operations
 */
public class UserDTO {

    private String id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @NotBlank(message = "Unit is required")
    private String unit;

    private User.Role role;

    private boolean contactsEnabled;

    private String avatarUrl;

    private String bio;

    private List<String> skills;

    private Map<String, String> socialLinks;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Constructors
    public UserDTO() {
    }

    public UserDTO(String id, String name, String email, String jobTitle, String unit, User.Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.jobTitle = jobTitle;
        this.unit = unit;
        this.role = role;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public User.Role getRole() {
        return role;
    }

    public void setRole(User.Role role) {
        this.role = role;
    }

    public boolean isContactsEnabled() {
        return contactsEnabled;
    }

    public void setContactsEnabled(boolean contactsEnabled) {
        this.contactsEnabled = contactsEnabled;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public Map<String, String> getSocialLinks() {
        return socialLinks;
    }

    public void setSocialLinks(Map<String, String> socialLinks) {
        this.socialLinks = socialLinks;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Builder pattern
    public static UserDTOBuilder builder() {
        return new UserDTOBuilder();
    }

    public static class UserDTOBuilder {
        private UserDTO userDTO = new UserDTO();

        public UserDTOBuilder id(String id) {
            userDTO.setId(id);
            return this;
        }

        public UserDTOBuilder name(String name) {
            userDTO.setName(name);
            return this;
        }

        public UserDTOBuilder email(String email) {
            userDTO.setEmail(email);
            return this;
        }

        public UserDTOBuilder jobTitle(String jobTitle) {
            userDTO.setJobTitle(jobTitle);
            return this;
        }

        public UserDTOBuilder unit(String unit) {
            userDTO.setUnit(unit);
            return this;
        }

        public UserDTOBuilder role(User.Role role) {
            userDTO.setRole(role);
            return this;
        }

        public UserDTOBuilder contactsEnabled(boolean contactsEnabled) {
            userDTO.setContactsEnabled(contactsEnabled);
            return this;
        }

        public UserDTOBuilder avatarUrl(String avatarUrl) {
            userDTO.setAvatarUrl(avatarUrl);
            return this;
        }

        public UserDTOBuilder bio(String bio) {
            userDTO.setBio(bio);
            return this;
        }

        public UserDTOBuilder skills(List<String> skills) {
            userDTO.setSkills(skills);
            return this;
        }

        public UserDTOBuilder socialLinks(Map<String, String> socialLinks) {
            userDTO.setSocialLinks(socialLinks);
            return this;
        }

        public UserDTOBuilder createdAt(LocalDateTime createdAt) {
            userDTO.setCreatedAt(createdAt);
            return this;
        }

        public UserDTOBuilder updatedAt(LocalDateTime updatedAt) {
            userDTO.setUpdatedAt(updatedAt);
            return this;
        }

        public UserDTO build() {
            return userDTO;
        }
    }

    // Helper method to convert from User entity
    public static UserDTO fromUser(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .jobTitle(user.getJobTitle())
                .unit(user.getUnit())
                .role(user.getRole())
                .contactsEnabled(user.isContactsEnabled())
                .avatarUrl(user.getAvatarUrl())
                .bio(user.getBio())
                .skills(user.getSkills())
                .socialLinks(user.getSocialLinks())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}