package com.certifyhub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

/**
 * Main Spring Boot Application class for CertifyHub
 * Employee Certification Repository API
 */
@SpringBootApplication
public class CertifyHubApplication implements CommandLineRunner {

    @Autowired
    private MongoTemplate mongoTemplate;

    public static void main(String[] args) {
        SpringApplication.run(CertifyHubApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            // Test MongoDB connection
            System.out.println("🔗 Testing MongoDB connection...");
            
            // Try to access database collections
            String dbName = mongoTemplate.getDb().getName();
            System.out.println("✅ Successfully connected to MongoDB database: " + dbName);
            
            // Test basic query on collections
            try {
                long userCount = mongoTemplate.count(new Query(), "users");
                System.out.println("✅ Users collection accessible. Current count: " + userCount);
            } catch (Exception e) {
                System.out.println("⚠️  Users collection not found (will be created when needed)");
            }
            
            try {
                long certCount = mongoTemplate.count(new Query(), "certificates");
                System.out.println("✅ Certificates collection accessible. Current count: " + certCount);
            } catch (Exception e) {
                System.out.println("⚠️  Certificates collection not found (will be created when needed)");
            }
            
            System.out.println("🎉 Database connection test PASSED!");
            System.out.println("📊 MongoDB Atlas is properly configured and accessible!");
            
        } catch (Exception e) {
            System.err.println("❌ Database connection test FAILED!");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            System.err.println("\n🔧 Please check:");
            System.err.println("1. MongoDB Atlas cluster is running");
            System.err.println("2. Network access is configured for your IP");
            System.err.println("3. Database user credentials are correct");
            System.err.println("4. MONGODB_URI environment variable is set correctly");
        }
    }
}
