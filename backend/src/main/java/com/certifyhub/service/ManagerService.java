package com.certifyhub.service;

import com.certifyhub.dto.CertificateDTO;
import com.certifyhub.dto.UserDTO;
import com.certifyhub.model.Certificate;
import com.certifyhub.model.User;
import com.certifyhub.repository.CertificateRepository;
import com.certifyhub.repository.UserRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for manager-specific operations
 */
@Service
public class ManagerService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private CertificateService certificateService;

    /**
     * Get all users in a unit
     */
    public List<UserDTO> getUnitMembers(String unit) {
        return userRepository.findByUnit(unit).stream()
                .map(UserDTO::fromUser)
                .collect(Collectors.toList());
    }

    /**
     * Get all certificates for a unit
     */
    public List<CertificateDTO> getUnitCertificates(String unit) {
        List<User> unitUsers = userRepository.findByUnit(unit);
        List<String> userIds = unitUsers.stream()
                .map(User::getId)
                .collect(Collectors.toList());

        return userIds.stream()
                .flatMap(userId -> certificateRepository.findByAuthorId(userId).stream())
                .map(this::convertToDTOWithAuthor)
                .collect(Collectors.toList());
    }

    /**
     * Export unit data as CSV
     */
    public byte[] exportUnitData(String unit) throws IOException {
        List<UserDTO> unitMembers = getUnitMembers(unit);
        
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try (CSVPrinter csvPrinter = new CSVPrinter(
                new OutputStreamWriter(out, StandardCharsets.UTF_8),
                CSVFormat.DEFAULT.withHeader(
                        "Name", "Email", "Job Title", "Unit", "Role", 
                        "Certificates Count", "Contact Enabled", "Join Date"
                ))) {

            for (UserDTO user : unitMembers) {
                long certCount = certificateRepository.countByAuthorId(user.getId());
                csvPrinter.printRecord(
                        user.getName(),
                        user.getEmail(),
                        user.getJobTitle(),
                        user.getUnit(),
                        user.getRole(),
                        certCount,
                        user.isContactsEnabled(),
                        user.getCreatedAt()
                );
            }
        }

        return out.toByteArray();
    }

    /**
     * Export unit certificates as CSV
     */
    public byte[] exportUnitCertificates(String unit) throws IOException {
        List<CertificateDTO> certificates = getUnitCertificates(unit);
        
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try (CSVPrinter csvPrinter = new CSVPrinter(
                new OutputStreamWriter(out, StandardCharsets.UTF_8),
                CSVFormat.DEFAULT.withHeader(
                        "Title", "Category", "Subcategory", "Issuer", 
                        "Completion Date", "Author Name", "Author Email", 
                        "Likes", "Views", "Created Date"
                ))) {

            for (CertificateDTO cert : certificates) {
                csvPrinter.printRecord(
                        cert.getTitle(),
                        cert.getCategory(),
                        cert.getSubcategory(),
                        cert.getIssuer(),
                        cert.getCompletionDate(),
                        cert.getAuthor() != null ? cert.getAuthor().getName() : "Unknown",
                        cert.getAuthor() != null ? cert.getAuthor().getEmail() : "Unknown",
                        cert.getLikes(),
                        cert.getViews(),
                        cert.getCreatedAt()
                );
            }
        }

        return out.toByteArray();
    }

    /**
     * Get unit statistics
     */
    public UnitStats getUnitStats(String unit) {
        List<UserDTO> unitMembers = getUnitMembers(unit);
        List<CertificateDTO> unitCertificates = getUnitCertificates(unit);

        int totalCertifications = unitCertificates.size();
        double avgCertificationsPerPerson = unitMembers.isEmpty() ? 0 : 
                (double) totalCertifications / unitMembers.size();

        long activeLearners = unitMembers.stream()
                .filter(member -> certificateRepository.countByAuthorId(member.getId()) > 0)
                .count();

        UserDTO topPerformer = unitMembers.stream()
                .max((a, b) -> Long.compare(
                        certificateRepository.countByAuthorId(a.getId()),
                        certificateRepository.countByAuthorId(b.getId())
                ))
                .orElse(null);

        return UnitStats.builder()
                .unitName(unit)
                .totalMembers(unitMembers.size())
                .totalCertifications(totalCertifications)
                .averageCertifications(Math.round(avgCertificationsPerPerson * 100.0) / 100.0)
                .activeLearners((int) activeLearners)
                .topPerformer(topPerformer)
                .build();
    }

    /**
     * Convert Certificate to DTO with author information
     */
    private CertificateDTO convertToDTOWithAuthor(Certificate certificate) {
        CertificateDTO dto = CertificateDTO.fromCertificate(certificate);
        
        // Add author information
        userRepository.findById(certificate.getAuthorId())
                .ifPresent(author -> dto.setAuthor(UserDTO.fromUser(author)));

        return dto;
    }

    /**
     * Unit statistics DTO
     */
    public static class UnitStats {
        private String unitName;
        private int totalMembers;
        private int totalCertifications;
        private double averageCertifications;
        private int activeLearners;
        private UserDTO topPerformer;

        public static UnitStatsBuilder builder() {
            return new UnitStatsBuilder();
        }

        // Getters and setters
        public String getUnitName() { return unitName; }
        public void setUnitName(String unitName) { this.unitName = unitName; }
        
        public int getTotalMembers() { return totalMembers; }
        public void setTotalMembers(int totalMembers) { this.totalMembers = totalMembers; }
        
        public int getTotalCertifications() { return totalCertifications; }
        public void setTotalCertifications(int totalCertifications) { this.totalCertifications = totalCertifications; }
        
        public double getAverageCertifications() { return averageCertifications; }
        public void setAverageCertifications(double averageCertifications) { this.averageCertifications = averageCertifications; }
        
        public int getActiveLearners() { return activeLearners; }
        public void setActiveLearners(int activeLearners) { this.activeLearners = activeLearners; }
        
        public UserDTO getTopPerformer() { return topPerformer; }
        public void setTopPerformer(UserDTO topPerformer) { this.topPerformer = topPerformer; }

        public static class UnitStatsBuilder {
            private String unitName;
            private int totalMembers;
            private int totalCertifications;
            private double averageCertifications;
            private int activeLearners;
            private UserDTO topPerformer;

            public UnitStatsBuilder unitName(String unitName) { this.unitName = unitName; return this; }
            public UnitStatsBuilder totalMembers(int totalMembers) { this.totalMembers = totalMembers; return this; }
            public UnitStatsBuilder totalCertifications(int totalCertifications) { this.totalCertifications = totalCertifications; return this; }
            public UnitStatsBuilder averageCertifications(double averageCertifications) { this.averageCertifications = averageCertifications; return this; }
            public UnitStatsBuilder activeLearners(int activeLearners) { this.activeLearners = activeLearners; return this; }
            public UnitStatsBuilder topPerformer(UserDTO topPerformer) { this.topPerformer = topPerformer; return this; }

            public UnitStats build() {
                UnitStats stats = new UnitStats();
                stats.unitName = this.unitName;
                stats.totalMembers = this.totalMembers;
                stats.totalCertifications = this.totalCertifications;
                stats.averageCertifications = this.averageCertifications;
                stats.activeLearners = this.activeLearners;
                stats.topPerformer = this.topPerformer;
                return stats;
            }
        }
    }
}
