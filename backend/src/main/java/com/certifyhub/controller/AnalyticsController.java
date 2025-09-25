package com.certifyhub.controller;

import com.certifyhub.dto.AnalyticsDTO;
import com.certifyhub.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for analytics operations
 */
@RestController
@RequestMapping("/api/analytics")
@Tag(name = "Analytics", description = "Analytics and reporting operations")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    /**
     * Get certificate counts by category
     */
    @GetMapping("/categories")
    @Operation(summary = "Get category statistics", description = "Get certificate counts grouped by category")
    public ResponseEntity<List<AnalyticsDTO.CategoryStats>> getCategoryStats() {
        List<AnalyticsDTO.CategoryStats> stats = analyticsService.getCategoryStats();
        return ResponseEntity.ok(stats);
    }

    /**
     * Get top issuers
     */
    @GetMapping("/issuers")
    @Operation(summary = "Get issuer statistics", description = "Get top certificate issuers by count")
    public ResponseEntity<List<AnalyticsDTO.IssuerStats>> getIssuerStats() {
        List<AnalyticsDTO.IssuerStats> stats = analyticsService.getIssuerStats();
        return ResponseEntity.ok(stats);
    }

    /**
     * Get certification timeline
     */
    @GetMapping("/timeline")
    @Operation(summary = "Get timeline statistics", description = "Get certification completion timeline by month")
    public ResponseEntity<List<AnalyticsDTO.TimelineStats>> getTimelineStats() {
        List<AnalyticsDTO.TimelineStats> stats = analyticsService.getTimelineStats();
        return ResponseEntity.ok(stats);
    }

    /**
     * Get unit statistics
     */
    @GetMapping("/units")
    @Operation(summary = "Get unit statistics", description = "Get certification distribution by organizational unit")
    public ResponseEntity<List<AnalyticsDTO.UnitStats>> getUnitStats() {
        List<AnalyticsDTO.UnitStats> stats = analyticsService.getUnitStats();
        return ResponseEntity.ok(stats);
    }

    /**
     * Get overview statistics
     */
    @GetMapping("/overview")
    @Operation(summary = "Get overview statistics", description = "Get comprehensive overview of certification data")
    public ResponseEntity<AnalyticsDTO.OverviewStats> getOverviewStats() {
        AnalyticsDTO.OverviewStats stats = analyticsService.getOverviewStats();
        return ResponseEntity.ok(stats);
    }
}
