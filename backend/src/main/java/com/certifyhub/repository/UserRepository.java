package com.certifyhub.repository;

import com.certifyhub.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User entity operations
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    /**
     * Find user by email (used for authentication)
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if user exists by email
     */
    boolean existsByEmail(String email);

    /**
     * Find users by unit
     */
    List<User> findByUnit(String unit);

    /**
     * Find users by role
     */
    List<User> findByRole(User.Role role);

    /**
     * Find users by unit and role
     */
    List<User> findByUnitAndRole(String unit, User.Role role);

    /**
     * Search users by name, jobTitle, or unit (case-insensitive)
     */
    @Query("{ $or: [ " +
           "{ 'name': { $regex: ?0, $options: 'i' } }, " +
           "{ 'jobTitle': { $regex: ?0, $options: 'i' } }, " +
           "{ 'unit': { $regex: ?0, $options: 'i' } } " +
           "] }")
    List<User> searchUsers(String searchTerm);

    /**
     * Find users by skills (case-insensitive)
     */
    @Query("{ 'skills': { $regex: ?0, $options: 'i' } }")
    List<User> findBySkillsContaining(String skill);

    /**
     * Find enabled users only
     */
    List<User> findByEnabledTrue();

    /**
     * Get all distinct units
     */
    @Query(value = "{}", fields = "{ 'unit': 1 }")
    List<User> findDistinctUnits();

    /**
     * Get all distinct job titles
     */
    @Query(value = "{}", fields = "{ 'jobTitle': 1 }")
    List<User> findDistinctJobTitles();

    /**
     * Count users by unit
     */
    long countByUnit(String unit);

    /**
     * Count users by role
     */
    long countByRole(User.Role role);
}
