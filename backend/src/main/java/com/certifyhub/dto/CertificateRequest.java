package com.certifyhub.dto;

import com.certifyhub.model.Certificate;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO for creating/updating certificates with file upload
 */
public class CertificateRequest {

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

    private MultipartFile file;

    private List<String> externalLinks;

    private String remarks;

    private List<String> tags;

    private Certificate.Visibility visibility = Certificate.Visibility.PUBLIC;

    // Constructors
    public CertificateRequest() {
    }

    public CertificateRequest(String title, String category, String issuer, LocalDate completionDate) {
        this.title = title;
        this.category = category;
        this.issuer = issuer;
        this.completionDate = completionDate;
        this.visibility = Certificate.Visibility.PUBLIC;
    }

    // Getters and Setters
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

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
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

    public Certificate.Visibility getVisibility() {
        return visibility;
    }

    public void setVisibility(Certificate.Visibility visibility) {
        this.visibility = visibility;
    }
}