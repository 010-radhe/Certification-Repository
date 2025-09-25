package com.certifyhub.dto;

import com.certifyhub.model.User;

/**
 * DTO for authentication responses
 */
public class AuthResponse {

    private String token;
    private String type = "Bearer";
    private String id;
    private String name;
    private String email;
    private User.Role role;
    private String unit;

    public AuthResponse() {
    }

    public AuthResponse(String token, String id, String name, String email, User.Role role, String unit) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.unit = unit;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

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

    public User.Role getRole() {
        return role;
    }

    public void setRole(User.Role role) {
        this.role = role;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public static AuthResponseBuilder builder() {
        return new AuthResponseBuilder();
    }

    public static class AuthResponseBuilder {
        private AuthResponse response = new AuthResponse();

        public AuthResponseBuilder token(String token) {
            response.setToken(token);
            return this;
        }

        public AuthResponseBuilder id(String id) {
            response.setId(id);
            return this;
        }

        public AuthResponseBuilder name(String name) {
            response.setName(name);
            return this;
        }

        public AuthResponseBuilder email(String email) {
            response.setEmail(email);
            return this;
        }

        public AuthResponseBuilder role(User.Role role) {
            response.setRole(role);
            return this;
        }

        public AuthResponseBuilder unit(String unit) {
            response.setUnit(unit);
            return this;
        }

        public AuthResponse build() {
            return response;
        }
    }
}