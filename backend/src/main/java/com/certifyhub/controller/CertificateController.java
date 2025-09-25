package com.certifyhub.controller;

import com.certifyhub.dto.CertificateDTO;
import com.certifyhub.dto.CertificateRequest;
import com.certifyhub.service.CertificateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * REST Controller for certificate operations
 */
@RestController
@RequestMapping("/api/certs")
@Tag(name = "Certificates", description = "Certificate management operations")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "*")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    /**
     * Get all certificates with pagination and filtering
     */
    @GetMapping
    @Operation(summary = "Get all certificates", description = "Retrieve certificates with pagination and optional filtering")
    public ResponseEntity<Page<CertificateDTO>> getAllCertificates(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort", defaultValue = "createdAt") String sort,
            @RequestParam(value = "direction", defaultValue = "desc") String direction,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "category", required = false) String category) {
        
        Sort.Direction sortDirection = "asc".equalsIgnoreCase(direction) ? 
                Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));
        
        Page<CertificateDTO> certificates;
        
        if (search != null && !search.trim().isEmpty()) {
            certificates = certificateService.searchCertificates(search, pageable);
        } else if (category != null && !category.trim().isEmpty()) {
            certificates = certificateService.getCertificatesByCategory(category, pageable);
        } else {
            certificates = certificateService.getAllCertificates(pageable);
        }
        
        return ResponseEntity.ok(certificates);
    }

    /**
     * Get certificate by ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get certificate by ID", description = "Retrieve certificate details by ID")
    public ResponseEntity<CertificateDTO> getCertificateById(@PathVariable String id) {
        Optional<CertificateDTO> certificate = certificateService.getCertificateById(id);
        return certificate.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create new certificate
     */
    @PostMapping
    @Operation(summary = "Create certificate", description = "Create a new certificate with file upload")
    public ResponseEntity<CertificateDTO> createCertificate(@Valid @ModelAttribute CertificateRequest request) {
        try {
            CertificateDTO certificate = certificateService.createCertificate(request);
            return ResponseEntity.ok(certificate);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Update certificate
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update certificate", description = "Update certificate information")
    public ResponseEntity<CertificateDTO> updateCertificate(
            @PathVariable String id, 
            @Valid @ModelAttribute CertificateRequest request) {
        try {
            CertificateDTO certificate = certificateService.updateCertificate(id, request);
            return ResponseEntity.ok(certificate);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Delete certificate
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete certificate", description = "Delete a certificate")
    public ResponseEntity<Void> deleteCertificate(@PathVariable String id) {
        try {
            certificateService.deleteCertificate(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Toggle like on certificate
     */
    @PostMapping("/{id}/like")
    @Operation(summary = "Toggle like", description = "Like or unlike a certificate")
    public ResponseEntity<CertificateDTO> toggleLike(@PathVariable String id) {
        try {
            CertificateDTO certificate = certificateService.toggleLike(id);
            return ResponseEntity.ok(certificate);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get certificates by author
     */
    @GetMapping("/author/{authorId}")
    @Operation(summary = "Get certificates by author", description = "Retrieve all certificates by a specific author")
    public ResponseEntity<List<CertificateDTO>> getCertificatesByAuthor(@PathVariable String authorId) {
        List<CertificateDTO> certificates = certificateService.getCertificatesByAuthor(authorId);
        return ResponseEntity.ok(certificates);
    }

    /**
     * Get certificates by tag
     */
    @GetMapping("/tag/{tag}")
    @Operation(summary = "Get certificates by tag", description = "Retrieve certificates containing a specific tag")
    public ResponseEntity<List<CertificateDTO>> getCertificatesByTag(@PathVariable String tag) {
        List<CertificateDTO> certificates = certificateService.getCertificatesByTag(tag);
        return ResponseEntity.ok(certificates);
    }

    /**
     * Get most liked certificates
     */
    @GetMapping("/trending/liked")
    @Operation(summary = "Get most liked certificates", description = "Retrieve top 10 most liked certificates")
    public ResponseEntity<List<CertificateDTO>> getMostLikedCertificates() {
        List<CertificateDTO> certificates = certificateService.getMostLikedCertificates();
        return ResponseEntity.ok(certificates);
    }

    /**
     * Get most viewed certificates
     */
    @GetMapping("/trending/viewed")
    @Operation(summary = "Get most viewed certificates", description = "Retrieve top 10 most viewed certificates")
    public ResponseEntity<List<CertificateDTO>> getMostViewedCertificates() {
        List<CertificateDTO> certificates = certificateService.getMostViewedCertificates();
        return ResponseEntity.ok(certificates);
    }

    /**
     * Get recent certificates
     */
    @GetMapping("/recent")
    @Operation(summary = "Get recent certificates", description = "Retrieve 20 most recently added certificates")
    public ResponseEntity<List<CertificateDTO>> getRecentCertificates() {
        List<CertificateDTO> certificates = certificateService.getRecentCertificates();
        return ResponseEntity.ok(certificates);
    }
}
