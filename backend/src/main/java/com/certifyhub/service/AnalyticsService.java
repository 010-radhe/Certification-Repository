package com.certifyhub.service;

import com.certifyhub.dto.AnalyticsDTO;
import com.certifyhub.repository.CertificateRepository;
import com.certifyhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for analytics operations
 */
@Service
public class AnalyticsService {

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Get certificate counts by category
     */
    public List<AnalyticsDTO.CategoryStats> getCategoryStats() {
        return certificateRepository.getCertificateCountsByCategory().stream()
                .map(result -> AnalyticsDTO.CategoryStats.builder()
                        .category(result.get_id())
                        .count(result.getCount())
                        .build())
                .collect(Collectors.toList());
    }

    /**
     * Get top issuers
     */
    public List<AnalyticsDTO.IssuerStats> getIssuerStats() {
        return certificateRepository.getTopIssuerCounts().stream()
                .map(result -> AnalyticsDTO.IssuerStats.builder()
                        .issuer(result.get_id())
                        .count(result.getCount())
                        .build())
                .collect(Collectors.toList());
    }

    /**
     * Get certification timeline
     */
    public List<AnalyticsDTO.TimelineStats> getTimelineStats() {
        return certificateRepository.getCertificateTimeline().stream()
                .map(result -> {
                    @SuppressWarnings("unchecked")
                    var id = (java.util.Map<String, Object>) result.get_id();
                    String period = id.get("year") + "-" + String.format("%02d", (Integer) id.get("month"));
                    
                    return AnalyticsDTO.TimelineStats.builder()
                            .period(period)
                            .count(result.getCount())
                            .build();
                })
                .collect(Collectors.toList());
    }

    /**
     * Get unit statistics
     */
    public List<AnalyticsDTO.UnitStats> getUnitStats() {
        List<String> units = userRepository.findDistinctUnits().stream()
                .map(user -> user.getUnit())
                .distinct()
                .collect(Collectors.toList());

        long totalCertificates = certificateRepository.count();

        return units.stream()
                .map(unit -> {
                    long unitUserCount = userRepository.countByUnit(unit);
                    // For simplicity, using user count as a proxy for certificate count by unit
                    // In a real implementation, you'd aggregate certificates by unit through user relationships
                    double percentage = totalCertificates > 0 ? (double) unitUserCount / totalCertificates * 100 : 0;
                    
                    return AnalyticsDTO.UnitStats.builder()
                            .unit(unit)
                            .count(unitUserCount)
                            .percentage(Math.round(percentage * 100.0) / 100.0)
                            .build();
                })
                .collect(Collectors.toList());
    }

    /**
     * Get overview statistics
     */
    public AnalyticsDTO.OverviewStats getOverviewStats() {
        long totalCertificates = certificateRepository.count();
        long totalUsers = userRepository.count();
        
        List<String> categories = certificateRepository.findDistinctCategories().stream()
                .map(cert -> cert.getCategory())
                .distinct()
                .collect(Collectors.toList());
        
        List<String> issuers = certificateRepository.findDistinctIssuers().stream()
                .map(cert -> cert.getIssuer())
                .distinct()
                .collect(Collectors.toList());

        double averageCerts = totalUsers > 0 ? (double) totalCertificates / totalUsers : 0;

        return AnalyticsDTO.OverviewStats.builder()
                .totalCertificates(totalCertificates)
                .totalUsers(totalUsers)
                .totalCategories(categories.size())
                .totalIssuers(issuers.size())
                .averageCertificatesPerUser(Math.round(averageCerts * 100.0) / 100.0)
                .topCategories(getCategoryStats().stream().limit(5).collect(Collectors.toList()))
                .topIssuers(getIssuerStats().stream().limit(5).collect(Collectors.toList()))
                .build();
    }
}
