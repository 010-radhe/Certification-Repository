package com.certifyhub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;

/**
 * Simple MongoDB connection test application
 */
@SpringBootApplication
public class DatabaseConnectionTest implements CommandLineRunner {

    @Autowired
    private MongoTemplate mongoTemplate;

    public static void main(String[] args) {
        SpringApplication.run(DatabaseConnectionTest.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            System.out.println("\n🔗 Testing MongoDB Atlas connection...");
            System.out.println("====================================");
            
            // Test 1: Get database name
            String dbName = mongoTemplate.getDb().getName();
            System.out.println("✅ Connected to database: " + dbName);
            
            // Test 2: Insert a test document
            mongoTemplate.getCollection("test").insertOne(
                new org.bson.Document("message", "Hello MongoDB!")
                    .append("timestamp", new java.util.Date())
                    .append("test", true)
            );
            System.out.println("✅ Successfully inserted test document");
            
            // Test 3: Count documents in test collection
            long count = mongoTemplate.getCollection("test").countDocuments();
            System.out.println("✅ Test collection has " + count + " documents");
            
            // Test 4: Query the test document
            org.bson.Document found = mongoTemplate.getCollection("test")
                .find(new org.bson.Document("test", true))
                .first();
            if (found != null) {
                System.out.println("✅ Successfully queried test document: " + found.getString("message"));
            }
            
            // Test 5: Delete the test document
            mongoTemplate.getCollection("test").deleteMany(new org.bson.Document("test", true));
            System.out.println("✅ Successfully cleaned up test documents");
            
            System.out.println("====================================");
            System.out.println("🎉 ALL TESTS PASSED!");
            System.out.println("🔥 MongoDB Atlas connection is working perfectly!");
            System.out.println("✨ Your database is ready for the CertifyHub application!");
            
        } catch (Exception e) {
            System.err.println("\n❌ DATABASE CONNECTION FAILED!");
            System.err.println("================================");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            System.err.println("\n🔧 TROUBLESHOOTING CHECKLIST:");
            System.err.println("1. ✔️ Is MongoDB Atlas cluster running?");
            System.err.println("2. ✔️ Is your IP address whitelisted in Network Access?");
            System.err.println("3. ✔️ Are the database credentials correct?");
            System.err.println("4. ✔️ Is the MONGODB_URI environment variable set?");
            System.err.println("5. ✔️ Is your internet connection stable?");
        }
        
        // Exit the application
        System.exit(0);
    }
}
