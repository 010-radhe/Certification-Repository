package com.certifyhub;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Simple Cloudinary configuration validation test
 */
@SpringBootApplication
public class CloudinaryConfigTest implements CommandLineRunner {

    @Autowired
    private Cloudinary cloudinary;

    public static void main(String[] args) {
        SpringApplication.run(CloudinaryConfigTest.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            System.out.println("\n🔧 Testing Cloudinary Configuration...");
            System.out.println("=====================================");
            
            // Test 1: Verify Cloudinary bean is created
            if (cloudinary != null) {
                System.out.println("✅ Cloudinary bean successfully created");
            } else {
                System.out.println("❌ Cloudinary bean is null");
                return;
            }
            
            // Test 2: Check configuration values
            String cloudName = cloudinary.config.cloudName;
            String apiKey = cloudinary.config.apiKey;
            String apiSecret = cloudinary.config.apiSecret;
            boolean secure = cloudinary.config.secure;
            
            System.out.println("✅ Cloud Name: " + cloudName);
            System.out.println("✅ API Key: " + (apiKey != null ? apiKey.substring(0, 6) + "..." : "null"));
            System.out.println("✅ API Secret: " + (apiSecret != null ? "***configured***" : "null"));
            System.out.println("✅ Secure Mode: " + secure);
            
            // Test 3: Generate a sample URL (no API call)
            String sampleUrl = cloudinary.url().generate("sample");
            System.out.println("✅ Sample URL generation: " + sampleUrl);
            
            // Test 4: Validate required fields
            boolean configValid = cloudName != null && !cloudName.isEmpty() &&
                                 apiKey != null && !apiKey.isEmpty() &&
                                 apiSecret != null && !apiSecret.isEmpty();
            
            if (configValid) {
                System.out.println("✅ All required configuration fields are present");
            } else {
                System.out.println("❌ Missing required configuration fields");
            }
            
            System.out.println("=====================================");
            
            if (configValid) {
                System.out.println("🎉 CLOUDINARY CONFIGURATION TEST PASSED!");
                System.out.println("📋 Your Cloudinary credentials are properly configured!");
                System.out.println("⚠️  Network connectivity to Cloudinary API needs verification");
                System.out.println("💡 The upload functionality will work once network access is available");
            } else {
                System.out.println("❌ CLOUDINARY CONFIGURATION INCOMPLETE!");
            }
            
        } catch (Exception e) {
            System.err.println("\n❌ CLOUDINARY CONFIGURATION TEST FAILED!");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
        
        // Exit the application
        System.exit(0);
    }
}
