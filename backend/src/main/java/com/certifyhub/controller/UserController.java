package com.certifyhub.controller;

import com.certifyhub.dto.UserDTO;
import com.certifyhub.model.User;
import com.certifyhub.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * REST Controller for user operations
 */
@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "User management operations")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Get all users
     */
    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieve all users or search by query")
    public ResponseEntity<List<UserDTO>> getAllUsers(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "unit", required = false) String unit,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "skill", required = false) String skill) {
        
        List<UserDTO> users;
        
        if (search != null && !search.trim().isEmpty()) {
            users = userService.searchUsers(search);
        } else if (unit != null && !unit.trim().isEmpty()) {
            users = userService.getUsersByUnit(unit);
        } else if (role != null && !role.trim().isEmpty()) {
            try {
                User.Role userRole = User.Role.valueOf(role.toUpperCase());
                users = userService.getUsersByRole(userRole);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        } else if (skill != null && !skill.trim().isEmpty()) {
            users = userService.getUsersBySkill(skill);
        } else {
            users = userService.getAllUsers();
        }
        
        return ResponseEntity.ok(users);
    }

    /**
     * Get user by ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieve user details by ID")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        Optional<UserDTO> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Update user profile
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update user profile", description = "Update user profile information")
    public ResponseEntity<UserDTO> updateUser(@PathVariable String id, @Valid @RequestBody UserDTO userDTO) {
        try {
            UserDTO updatedUser = userService.updateUser(id, userDTO);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get all units
     */
    @GetMapping("/units")
    @Operation(summary = "Get all units", description = "Retrieve all distinct units")
    public ResponseEntity<List<String>> getAllUnits() {
        List<String> units = userService.getAllUnits();
        return ResponseEntity.ok(units);
    }

    /**
     * Get all job titles
     */
    @GetMapping("/job-titles")
    @Operation(summary = "Get all job titles", description = "Retrieve all distinct job titles")
    public ResponseEntity<List<String>> getAllJobTitles() {
        List<String> jobTitles = userService.getAllJobTitles();
        return ResponseEntity.ok(jobTitles);
    }

    /**
     * Get managers
     */
    @GetMapping("/managers")
    @Operation(summary = "Get managers", description = "Retrieve all users with manager role")
    public ResponseEntity<List<UserDTO>> getManagers() {
        List<UserDTO> managers = userService.getManagers();
        return ResponseEntity.ok(managers);
    }
}
