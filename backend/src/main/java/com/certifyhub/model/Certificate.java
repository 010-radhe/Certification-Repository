package com.certifyhub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

/**
 * Certificate entity representing employee certifications
 */
@Document(collection = "certificates")
public class Certificate {

    @Id
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

    private List<String> externalLinks = new ArrayList<>();

    private String remarks;

    private List<String> tags = new ArrayList<>();

    @NotNull(message = "Author is required")
    private String authorId; // Reference to User ID

    private int likes = 0;

    private int views = 0;

    private Set<String> likedByUsers = new HashSet<>();

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    private Visibility visibility = Visibility.PUBLIC;

    public enum Visibility {
        PUBLIC, PRIVATE, UNIT_ONLY
    }

    // Constructors
    public Certificate() {
    }

    public Certificate(String title, String category, String issuer, LocalDate completionDate, String fileUrl, String authorId) {
        this.title = title;
        this.category = category;
        this.issuer = issuer;
        this.completionDate = completionDate;
        this.fileUrl = fileUrl;
        this.authorId = authorId;
        this.externalLinks = new ArrayList<>();
        this.tags = new ArrayList<>();
        this.likes = 0;
        this.views = 0;
        this.likedByUsers = new HashSet<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.visibility = Visibility.PUBLIC;
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

    public Set<String> getLikedByUsers() {
        return likedByUsers;
    }

    public void setLikedByUsers(Set<String> likedByUsers) {
        this.likedByUsers = likedByUsers;
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

    public Visibility getVisibility() {
        return visibility;
    }

    public void setVisibility(Visibility visibility) {
        this.visibility = visibility;
    }

    // Helper methods
    public void incrementViews() {
        this.views++;
        updateTimestamp();
    }

    public boolean toggleLike(String userId) {
        boolean wasLiked = likedByUsers.contains(userId);
        if (wasLiked) {
            likedByUsers.remove(userId);
            likes = Math.max(0, likes - 1);
        } else {
            likedByUsers.add(userId);
            likes++;
        }
        updateTimestamp();
        return !wasLiked; // Return true if liked, false if unliked
    }

    public boolean isLikedBy(String userId) {
        return likedByUsers.contains(userId);
    }

    public void updateTimestamp() {
        this.updatedAt = LocalDateTime.now();
    }

    public void addTag(String tag) {
        if (tag != null && !tag.trim().isEmpty() && !tags.contains(tag.toLowerCase())) {
            tags.add(tag.toLowerCase());
            updateTimestamp();
        }
    }

    public void removeTag(String tag) {
        if (tags.remove(tag.toLowerCase())) {
            updateTimestamp();
        }
    }

    public void addExternalLink(String link) {
        if (link != null && !link.trim().isEmpty() && !externalLinks.contains(link)) {
            externalLinks.add(link);
            updateTimestamp();
        }
    }

    public void removeExternalLink(String link) {
        if (externalLinks.remove(link)) {
            updateTimestamp();
        }
    }

    // Builder pattern
    public static CertificateBuilder builder() {
        return new CertificateBuilder();
    }

    public static class CertificateBuilder {
        private Certificate certificate = new Certificate();

        public CertificateBuilder id(String id) {
            certificate.setId(id);
            return this;
        }

        public CertificateBuilder title(String title) {
            certificate.setTitle(title);
            return this;
        }

        public CertificateBuilder category(String category) {
            certificate.setCategory(category);
            return this;
        }

        public CertificateBuilder subcategory(String subcategory) {
            certificate.setSubcategory(subcategory);
            return this;
        }

        public CertificateBuilder issuer(String issuer) {
            certificate.setIssuer(issuer);
            return this;
        }

        public CertificateBuilder completionDate(LocalDate completionDate) {
            certificate.setCompletionDate(completionDate);
            return this;
        }

        public CertificateBuilder fileUrl(String fileUrl) {
            certificate.setFileUrl(fileUrl);
            return this;
        }

        public CertificateBuilder externalLinks(List<String> externalLinks) {
            certificate.setExternalLinks(externalLinks);
            return this;
        }

        public CertificateBuilder remarks(String remarks) {
            certificate.setRemarks(remarks);
            return this;
        }

        public CertificateBuilder tags(List<String> tags) {
            certificate.setTags(tags);
            return this;
        }

        public CertificateBuilder authorId(String authorId) {
            certificate.setAuthorId(authorId);
            return this;
        }

        public CertificateBuilder likes(int likes) {
            certificate.setLikes(likes);
            return this;
        }

        public CertificateBuilder views(int views) {
            certificate.setViews(views);
            return this;
        }

        public CertificateBuilder visibility(Visibility visibility) {
            certificate.setVisibility(visibility);
            return this;
        }

        public Certificate build() {
            return certificate;
        }
    }
}