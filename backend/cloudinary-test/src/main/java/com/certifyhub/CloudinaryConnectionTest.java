package com.certifyhub;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Map;

/**
 * Simple Cloudinary connection and file upload test application
 */
// @SpringBootApplication
public class CloudinaryConnectionTest implements CommandLineRunner {

    @Autowired
    private Cloudinary cloudinary;

    public static void main(String[] args) {
        SpringApplication.run(CloudinaryConnectionTest.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            System.out.println("\n📁 Testing Cloudinary file upload service...");
            System.out.println("===============================================");
            
            // Test 1: Check Cloudinary configuration
            String cloudName = cloudinary.config.cloudName;
            String apiKey = cloudinary.config.apiKey;
            System.out.println("✅ Cloud Name: " + cloudName);
            System.out.println("✅ API Key: " + apiKey + "...");
            
            // Test 2: Create a temporary test file
            File testFile = createTestFile();
            System.out.println("✅ Created test file: " + testFile.getName());
            
            // Test 3: Upload file to Cloudinary
            System.out.println("🔄 Uploading test file to Cloudinary...");
            Map uploadResult = cloudinary.uploader().upload(testFile, 
                ObjectUtils.asMap(
                    "folder", "certifyhub-test",
                    "public_id", "test-upload-" + System.currentTimeMillis(),
                    "resource_type", "auto"
                )
            );
            
            String uploadedUrl = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");
            System.out.println("✅ File uploaded successfully!");
            System.out.println("📸 Public ID: " + publicId);
            System.out.println("🔗 Secure URL: " + uploadedUrl);
            
            // Test 4: Verify file details
            long fileSize = (Long) uploadResult.get("bytes");
            String format = (String) uploadResult.get("format");
            String resourceType = (String) uploadResult.get("resource_type");
            System.out.println("✅ File Size: " + fileSize + " bytes");
            System.out.println("✅ Format: " + format);
            System.out.println("✅ Resource Type: " + resourceType);
            
            // Test 5: Verify URL generation works
            String basicUrl = cloudinary.url().generate(publicId);
            System.out.println("✅ Basic URL: " + basicUrl);
            
            // Test 6: Delete the test file from Cloudinary
            System.out.println("🧹 Cleaning up - deleting test file...");
            Map deleteResult = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            String deleteStatus = (String) deleteResult.get("result");
            System.out.println("✅ Cleanup result: " + deleteStatus);
            
            // Test 7: Clean up local test file
            if (testFile.exists()) {
                testFile.delete();
                System.out.println("✅ Local test file cleaned up");
            }
            
            System.out.println("===============================================");
            System.out.println("🎉 ALL CLOUDINARY TESTS PASSED!");
            System.out.println("☁️ Cloudinary file upload service is working perfectly!");
            System.out.println("📁 Your file storage is ready for the CertifyHub application!");
            
        } catch (Exception e) {
            System.err.println("\n❌ CLOUDINARY CONNECTION FAILED!");
            System.err.println("=================================");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            System.err.println("\n🔧 TROUBLESHOOTING CHECKLIST:");
            System.err.println("1. ✔️ Are the Cloudinary credentials correct?");
            System.err.println("2. ✔️ Is the CLOUDINARY_URL environment variable set?");
            System.err.println("3. ✔️ Is your Cloudinary account active?");
            System.err.println("4. ✔️ Do you have upload permissions?");
            System.err.println("5. ✔️ Is your internet connection stable?");
        }
        
        // Exit the application
        System.exit(0);
    }
    
    private File createTestFile() throws IOException {
        File tempFile = File.createTempFile("certifyhub-test", ".txt");
        try (FileWriter writer = new FileWriter(tempFile)) {
            writer.write("CertifyHub Cloudinary Connection Test\n");
            writer.write("====================================\n");
            writer.write("This is a test file for verifying Cloudinary upload functionality.\n");
            writer.write("Created at: " + new java.util.Date() + "\n");
            writer.write("File purpose: Testing file upload to Cloudinary\n");
            writer.write("Expected outcome: Successful upload and cleanup\n");
        }
        return tempFile;
    }
}
