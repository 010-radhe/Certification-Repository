package com.certifyhub.repository;

import com.certifyhub.model.Certificate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository interface for Certificate entity operations
 */
@Repository
public interface CertificateRepository extends MongoRepository<Certificate, String> {

    /**
     * Find certificates by author ID
     */
    List<Certificate> findByAuthorId(String authorId);

    /**
     * Find certificates by author ID with pagination
     */
    Page<Certificate> findByAuthorId(String authorId, Pageable pageable);

    /**
     * Find certificates by category
     */
    List<Certificate> findByCategory(String category);

    /**
     * Find certificates by category with pagination
     */
    Page<Certificate> findByCategory(String category, Pageable pageable);

    /**
     * Find certificates by subcategory
     */
    List<Certificate> findBySubcategory(String subcategory);

    /**
     * Find certificates by issuer
     */
    List<Certificate> findByIssuer(String issuer);

    /**
     * Find certificates by visibility
     */
    List<Certificate> findByVisibility(Certificate.Visibility visibility);

    /**
     * Find certificates by tags containing specific tag
     */
    List<Certificate> findByTagsContaining(String tag);

    /**
     * Find certificates completed after a specific date
     */
    List<Certificate> findByCompletionDateAfter(LocalDate date);

    /**
     * Find certificates completed between dates
     */
    List<Certificate> findByCompletionDateBetween(LocalDate startDate, LocalDate endDate);

    /**
     * Find certificates created after a specific date
     */
    List<Certificate> findByCreatedAtAfter(LocalDateTime date);

    /**
     * Search certificates by title, category, issuer, or tags (case-insensitive)
     */
    @Query("{ $or: [ " +
           "{ 'title': { $regex: ?0, $options: 'i' } }, " +
           "{ 'category': { $regex: ?0, $options: 'i' } }, " +
           "{ 'issuer': { $regex: ?0, $options: 'i' } }, " +
           "{ 'tags': { $regex: ?0, $options: 'i' } } " +
           "] }")
    List<Certificate> searchCertificates(String searchTerm);

    /**
     * Search certificates with pagination
     */
    @Query("{ $or: [ " +
           "{ 'title': { $regex: ?0, $options: 'i' } }, " +
           "{ 'category': { $regex: ?0, $options: 'i' } }, " +
           "{ 'issuer': { $regex: ?0, $options: 'i' } }, " +
           "{ 'tags': { $regex: ?0, $options: 'i' } } " +
           "] }")
    Page<Certificate> searchCertificates(String searchTerm, Pageable pageable);

    /**
     * Find certificates by multiple criteria
     */
    @Query("{ $and: [ " +
           "{ $or: [ " +
           "  { 'title': { $regex: ?0, $options: 'i' } }, " +
           "  { 'category': { $regex: ?0, $options: 'i' } }, " +
           "  { 'issuer': { $regex: ?0, $options: 'i' } }, " +
           "  { 'tags': { $regex: ?0, $options: 'i' } } " +
           "] }, " +
           "{ 'category': { $regex: ?1, $options: 'i' } }, " +
           "{ 'tags': { $in: ?2 } } " +
           "] }")
    Page<Certificate> findBySearchAndCategoryAndTags(String searchTerm, String category, List<String> tags, Pageable pageable);

    /**
     * Find most liked certificates
     */
    List<Certificate> findTop10ByOrderByLikesDesc();

    /**
     * Find most viewed certificates
     */
    List<Certificate> findTop10ByOrderByViewsDesc();

    /**
     * Find recent certificates
     */
    List<Certificate> findTop20ByOrderByCreatedAtDesc();

    /**
     * Count certificates by category
     */
    long countByCategory(String category);

    /**
     * Count certificates by issuer
     */
    long countByIssuer(String issuer);

    /**
     * Count certificates by author
     */
    long countByAuthorId(String authorId);

    /**
     * Get distinct categories
     */
    @Query(value = "{}", fields = "{ 'category': 1 }")
    List<Certificate> findDistinctCategories();

    /**
     * Get distinct subcategories
     */
    @Query(value = "{}", fields = "{ 'subcategory': 1 }")
    List<Certificate> findDistinctSubcategories();

    /**
     * Get distinct issuers
     */
    @Query(value = "{}", fields = "{ 'issuer': 1 }")
    List<Certificate> findDistinctIssuers();

    /**
     * Get all distinct tags
     */
    @Query(value = "{}", fields = "{ 'tags': 1 }")
    List<Certificate> findDistinctTags();

    /**
     * Aggregation to get certificate counts by category
     */
    @Aggregation(pipeline = {
        "{ $group: { _id: '$category', count: { $sum: 1 } } }",
        "{ $sort: { count: -1 } }"
    })
    List<CategoryCount> getCertificateCountsByCategory();

    /**
     * Aggregation to get certificate counts by issuer
     */
    @Aggregation(pipeline = {
        "{ $group: { _id: '$issuer', count: { $sum: 1 } } }",
        "{ $sort: { count: -1 } }",
        "{ $limit: 10 }"
    })
    List<IssuerCount> getTopIssuerCounts();

    /**
     * Aggregation to get certificate timeline by month
     */
    @Aggregation(pipeline = {
        "{ $group: { " +
        "    _id: { " +
        "      year: { $year: '$completionDate' }, " +
        "      month: { $month: '$completionDate' } " +
        "    }, " +
        "    count: { $sum: 1 } " +
        "} }",
        "{ $sort: { '_id.year': 1, '_id.month': 1 } }"
    })
    List<TimelineCount> getCertificateTimeline();

    // Inner classes for aggregation results
    interface CategoryCount {
        String get_id();
        int getCount();
    }

    interface IssuerCount {
        String get_id();
        int getCount();
    }

    interface TimelineCount {
        Object get_id();
        int getCount();
    }
}
