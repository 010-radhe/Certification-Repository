package com.certifyhub.controller;

import com.certifyhub.dto.CertificateDTO;
import com.certifyhub.dto.UserDTO;
import com.certifyhub.service.ManagerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

/**
 * REST Controller for manager operations
 */
@RestController
@RequestMapping("/api/manager")
@Tag(name = "Manager", description = "Manager-specific operations")
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
@CrossOrigin(origins = "*")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    /**
     * Get all users in a unit
     */
    @GetMapping("/unit/{unit}/members")
    @Operation(summary = "Get unit members", description = "Get all users in a specific unit")
    public ResponseEntity<List<UserDTO>> getUnitMembers(@PathVariable String unit) {
        List<UserDTO> members = managerService.getUnitMembers(unit);
        return ResponseEntity.ok(members);
    }

    /**
     * Get all certificates for a unit
     */
    @GetMapping("/unit/{unit}/certs")
    @Operation(summary = "Get unit certificates", description = "Get all certificates for users in a specific unit")
    public ResponseEntity<List<CertificateDTO>> getUnitCertificates(@PathVariable String unit) {
        List<CertificateDTO> certificates = managerService.getUnitCertificates(unit);
        return ResponseEntity.ok(certificates);
    }

    /**
     * Get unit statistics
     */
    @GetMapping("/unit/{unit}/stats")
    @Operation(summary = "Get unit statistics", description = "Get comprehensive statistics for a unit")
    public ResponseEntity<ManagerService.UnitStats> getUnitStats(@PathVariable String unit) {
        ManagerService.UnitStats stats = managerService.getUnitStats(unit);
        return ResponseEntity.ok(stats);
    }

    /**
     * Export unit members data as CSV
     */
    @GetMapping("/unit/{unit}/export/members")
    @Operation(summary = "Export unit members", description = "Export unit members data as CSV file")
    public ResponseEntity<byte[]> exportUnitMembers(@PathVariable String unit) {
        try {
            byte[] csvData = managerService.exportUnitData(unit);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", unit + "_members.csv");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvData);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Export unit certificates data as CSV
     */
    @GetMapping("/unit/{unit}/export/certificates")
    @Operation(summary = "Export unit certificates", description = "Export unit certificates data as CSV file")
    public ResponseEntity<byte[]> exportUnitCertificates(@PathVariable String unit) {
        try {
            byte[] csvData = managerService.exportUnitCertificates(unit);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", unit + "_certificates.csv");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvData);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Mock export endpoint for general CSV export
     */
    @GetMapping("/unit/{unit}/export")
    @Operation(summary = "Export unit data", description = "Export comprehensive unit data as CSV file")
    public ResponseEntity<byte[]> exportUnitData(@PathVariable String unit) {
        try {
            byte[] csvData = managerService.exportUnitData(unit);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", unit + "_data.csv");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvData);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
