package com.certifyhub.dto;

import com.certifyhub.model.Certificate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for Certificate entity operations
 */
public class CertificateDTO {

    private String id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Category is required")
    private String category;

    private String subcategory;

    @NotBlank(message = "Issuer is required")
    private String issuer;

    @NotNull(message = "Completion date is required")
    @PastOrPresent(message = "Completion date cannot be in the future")
    private LocalDate completionDate;

    @NotBlank(message = "File URL is required")
    private String fileUrl;

    private List<String> externalLinks;

    private String remarks;

    private List<String> tags;

    private String authorId;

    private UserDTO author; // Populated when needed

    private int likes;

    private int views;

    private Certificate.Visibility visibility;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private boolean likedByCurrentUser; // For current user context

    // Constructors
    public CertificateDTO() {
    }

    public CertificateDTO(String id, String title, String category, String issuer, LocalDate completionDate) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.issuer = issuer;
        this.completionDate = completionDate;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public LocalDate getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public List<String> getExternalLinks() {
        return externalLinks;
    }

    public void setExternalLinks(List<String> externalLinks) {
        this.externalLinks = externalLinks;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public UserDTO getAuthor() {
        return author;
    }

    public void setAuthor(UserDTO author) {
        this.author = author;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public Certificate.Visibility getVisibility() {
        return visibility;
    }

    public void setVisibility(Certificate.Visibility visibility) {
        this.visibility = visibility;
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

    public boolean isLikedByCurrentUser() {
        return likedByCurrentUser;
    }

    public void setLikedByCurrentUser(boolean likedByCurrentUser) {
        this.likedByCurrentUser = likedByCurrentUser;
    }

    // Builder pattern
    public static CertificateDTOBuilder builder() {
        return new CertificateDTOBuilder();
    }

    public static class CertificateDTOBuilder {
        private CertificateDTO certificateDTO = new CertificateDTO();

        public CertificateDTOBuilder id(String id) {
            certificateDTO.setId(id);
            return this;
        }

        public CertificateDTOBuilder title(String title) {
            certificateDTO.setTitle(title);
            return this;
        }

        public CertificateDTOBuilder category(String category) {
            certificateDTO.setCategory(category);
            return this;
        }

        public CertificateDTOBuilder subcategory(String subcategory) {
            certificateDTO.setSubcategory(subcategory);
            return this;
        }

        public CertificateDTOBuilder issuer(String issuer) {
            certificateDTO.setIssuer(issuer);
            return this;
        }

        public CertificateDTOBuilder completionDate(LocalDate completionDate) {
            certificateDTO.setCompletionDate(completionDate);
            return this;
        }

        public CertificateDTOBuilder fileUrl(String fileUrl) {
            certificateDTO.setFileUrl(fileUrl);
            return this;
        }

        public CertificateDTOBuilder externalLinks(List<String> externalLinks) {
            certificateDTO.setExternalLinks(externalLinks);
            return this;
        }

        public CertificateDTOBuilder remarks(String remarks) {
            certificateDTO.setRemarks(remarks);
            return this;
        }

        public CertificateDTOBuilder tags(List<String> tags) {
            certificateDTO.setTags(tags);
            return this;
        }

        public CertificateDTOBuilder authorId(String authorId) {
            certificateDTO.setAuthorId(authorId);
            return this;
        }

        public CertificateDTOBuilder author(UserDTO author) {
            certificateDTO.setAuthor(author);
            return this;
        }

        public CertificateDTOBuilder likes(int likes) {
            certificateDTO.setLikes(likes);
            return this;
        }

        public CertificateDTOBuilder views(int views) {
            certificateDTO.setViews(views);
            return this;
        }

        public CertificateDTOBuilder visibility(Certificate.Visibility visibility) {
            certificateDTO.setVisibility(visibility);
            return this;
        }

        public CertificateDTOBuilder createdAt(LocalDateTime createdAt) {
            certificateDTO.setCreatedAt(createdAt);
            return this;
        }

        public CertificateDTOBuilder updatedAt(LocalDateTime updatedAt) {
            certificateDTO.setUpdatedAt(updatedAt);
            return this;
        }

        public CertificateDTOBuilder likedByCurrentUser(boolean likedByCurrentUser) {
            certificateDTO.setLikedByCurrentUser(likedByCurrentUser);
            return this;
        }

        public CertificateDTO build() {
            return certificateDTO;
        }
    }

    // Helper method to convert from Certificate entity
    public static CertificateDTO fromCertificate(Certificate certificate) {
        return CertificateDTO.builder()
                .id(certificate.getId())
                .title(certificate.getTitle())
                .category(certificate.getCategory())
                .subcategory(certificate.getSubcategory())
                .issuer(certificate.getIssuer())
                .completionDate(certificate.getCompletionDate())
                .fileUrl(certificate.getFileUrl())
                .externalLinks(certificate.getExternalLinks())
                .remarks(certificate.getRemarks())
                .tags(certificate.getTags())
                .authorId(certificate.getAuthorId())
                .likes(certificate.getLikes())
                .views(certificate.getViews())
                .visibility(certificate.getVisibility())
                .createdAt(certificate.getCreatedAt())
                .updatedAt(certificate.getUpdatedAt())
                .build();
    }
}