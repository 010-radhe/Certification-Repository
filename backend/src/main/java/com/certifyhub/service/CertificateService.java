package com.certifyhub.service;

import com.certifyhub.dto.CertificateDTO;
import com.certifyhub.dto.CertificateRequest;
import com.certifyhub.dto.UserDTO;
import com.certifyhub.model.Certificate;
import com.certifyhub.model.User;
import com.certifyhub.repository.CertificateRepository;
import com.certifyhub.repository.UserRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service for certificate management operations
 */
@Service
public class CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Cloudinary cloudinary;

    /**
     * Get all certificates with pagination
     */
    public Page<CertificateDTO> getAllCertificates(Pageable pageable) {
        return certificateRepository.findAll(pageable)
                .map(this::convertToDTOWithAuthor);
    }

    /**
     * Get certificate by ID
     */
    public Optional<CertificateDTO> getCertificateById(String id) {
        Optional<Certificate> certificate = certificateRepository.findById(id);
        
        if (certificate.isPresent()) {
            // Increment view count
            Certificate cert = certificate.get();
            cert.incrementViews();
            certificateRepository.save(cert);
            
            return Optional.of(convertToDTOWithAuthor(cert));
        }
        
        return Optional.empty();
    }

    /**
     * Create new certificate
     */
    public CertificateDTO createCertificate(CertificateRequest request) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User author = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Upload file to Cloudinary if provided
        String fileUrl = null;
        if (request.getFile() != null && !request.getFile().isEmpty()) {
            fileUrl = uploadFile(request.getFile());
        }

        Certificate certificate = Certificate.builder()
                .title(request.getTitle())
                .category(request.getCategory())
                .subcategory(request.getSubcategory())
                .issuer(request.getIssuer())
                .completionDate(request.getCompletionDate())
                .fileUrl(fileUrl)
                .externalLinks(request.getExternalLinks())
                .remarks(request.getRemarks())
                .tags(request.getTags())
                .authorId(author.getId())
                .visibility(request.getVisibility())
                .build();

        certificate = certificateRepository.save(certificate);
        return convertToDTOWithAuthor(certificate);
    }

    /**
     * Update certificate
     */
    public CertificateDTO updateCertificate(String id, CertificateRequest request) {
        Certificate certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if user is author or admin
        if (!certificate.getAuthorId().equals(currentUser.getId()) && !currentUser.isAdmin()) {
            throw new RuntimeException("Access denied. You can only edit your own certificates.");
        }

        // Update fields
        certificate.setTitle(request.getTitle());
        certificate.setCategory(request.getCategory());
        certificate.setSubcategory(request.getSubcategory());
        certificate.setIssuer(request.getIssuer());
        certificate.setCompletionDate(request.getCompletionDate());
        certificate.setExternalLinks(request.getExternalLinks());
        certificate.setRemarks(request.getRemarks());
        certificate.setTags(request.getTags());
        certificate.setVisibility(request.getVisibility());

        // Upload new file if provided
        if (request.getFile() != null && !request.getFile().isEmpty()) {
            String fileUrl = uploadFile(request.getFile());
            certificate.setFileUrl(fileUrl);
        }

        certificate.updateTimestamp();
        certificate = certificateRepository.save(certificate);
        
        return convertToDTOWithAuthor(certificate);
    }

    /**
     * Delete certificate
     */
    public void deleteCertificate(String id) {
        Certificate certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if user is author or admin
        if (!certificate.getAuthorId().equals(currentUser.getId()) && !currentUser.isAdmin()) {
            throw new RuntimeException("Access denied. You can only delete your own certificates.");
        }

        certificateRepository.delete(certificate);
    }

    /**
     * Toggle like on certificate
     */
    public CertificateDTO toggleLike(String id) {
        Certificate certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        certificate.toggleLike(currentUser.getId());
        certificate = certificateRepository.save(certificate);
        
        return convertToDTOWithAuthor(certificate);
    }

    /**
     * Search certificates
     */
    public Page<CertificateDTO> searchCertificates(String query, Pageable pageable) {
        return certificateRepository.searchCertificates(query, pageable)
                .map(this::convertToDTOWithAuthor);
    }

    /**
     * Get certificates by category
     */
    public Page<CertificateDTO> getCertificatesByCategory(String category, Pageable pageable) {
        return certificateRepository.findByCategory(category, pageable)
                .map(this::convertToDTOWithAuthor);
    }

    /**
     * Get certificates by author
     */
    public List<CertificateDTO> getCertificatesByAuthor(String authorId) {
        return certificateRepository.findByAuthorId(authorId).stream()
                .map(this::convertToDTOWithAuthor)
                .collect(Collectors.toList());
    }

    /**
     * Get certificates by tags
     */
    public List<CertificateDTO> getCertificatesByTag(String tag) {
        return certificateRepository.findByTagsContaining(tag).stream()
                .map(this::convertToDTOWithAuthor)
                .collect(Collectors.toList());
    }

    /**
     * Get most liked certificates
     */
    public List<CertificateDTO> getMostLikedCertificates() {
        return certificateRepository.findTop10ByOrderByLikesDesc().stream()
                .map(this::convertToDTOWithAuthor)
                .collect(Collectors.toList());
    }

    /**
     * Get most viewed certificates
     */
    public List<CertificateDTO> getMostViewedCertificates() {
        return certificateRepository.findTop10ByOrderByViewsDesc().stream()
                .map(this::convertToDTOWithAuthor)
                .collect(Collectors.toList());
    }

    /**
     * Get recent certificates
     */
    public List<CertificateDTO> getRecentCertificates() {
        return certificateRepository.findTop20ByOrderByCreatedAtDesc().stream()
                .map(this::convertToDTOWithAuthor)
                .collect(Collectors.toList());
    }

    /**
     * Upload file to Cloudinary
     */
    private String uploadFile(MultipartFile file) {
        try {
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "certificates",
                            "resource_type", "auto"
                    ));
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    /**
     * Convert Certificate to DTO with author information
     */
    private CertificateDTO convertToDTOWithAuthor(Certificate certificate) {
        CertificateDTO dto = CertificateDTO.fromCertificate(certificate);
        
        // Add author information
        userRepository.findById(certificate.getAuthorId())
                .ifPresent(author -> dto.setAuthor(UserDTO.fromUser(author)));

        // Check if current user liked this certificate
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        if (currentUserEmail != null && !currentUserEmail.equals("anonymousUser")) {
            userRepository.findByEmail(currentUserEmail)
                    .ifPresent(user -> dto.setLikedByCurrentUser(certificate.isLikedBy(user.getId())));
        }

        return dto;
    }
}
