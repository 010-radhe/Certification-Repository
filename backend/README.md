# CertifyHub Backend API

Employee Certification Repository API built with Spring Boot, MongoDB Atlas, and Cloudinary.

## Tech Stack

- **Spring Boot 3.3.4** - Java framework for building REST APIs
- **Java 17+** - Programming language
- **MongoDB Atlas** - Cloud database for storing user and certificate data
- **Spring Security + JWT** - Authentication and authorization
- **Cloudinary** - File upload service for certificate documents
- **Swagger/OpenAPI** - API documentation
- **Lombok** - Reduces boilerplate code
- **Maven** - Build and dependency management

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Role-based access control (USER, MANAGER, ADMIN)

### Certificate Management
- Upload certificates with file attachments
- Search and filter certificates
- Like and view tracking
- Category and tag-based organization

### Analytics
- Certificate statistics by category
- Top issuers and trending certificates
- Timeline analysis
- Unit-wise performance metrics

### Manager Features
- Unit team management
- CSV export of team data
- Performance tracking and reporting

## Project Structure

```
src/main/java/com/certifyhub/
├── config/              # Configuration classes
│   ├── SecurityConfig.java
│   ├── CloudinaryConfig.java
│   ├── OpenApiConfig.java
│   ├── JwtAuthenticationEntryPoint.java
│   └── JwtRequestFilter.java
├── controller/          # REST controllers
│   ├── AuthController.java
│   ├── UserController.java
│   ├── CertificateController.java
│   ├── AnalyticsController.java
│   └── ManagerController.java
├── dto/                 # Data Transfer Objects
│   ├── AuthRequest.java
│   ├── AuthResponse.java
│   ├── UserDTO.java
│   ├── CertificateDTO.java
│   └── AnalyticsDTO.java
├── model/               # Entity models
│   ├── User.java
│   └── Certificate.java
├── repository/          # MongoDB repositories
│   ├── UserRepository.java
│   └── CertificateRepository.java
├── service/             # Business logic
│   ├── AuthService.java
│   ├── UserService.java
│   ├── CertificateService.java
│   ├── AnalyticsService.java
│   └── ManagerService.java
├── util/                # Utility classes
│   └── JwtUtil.java
└── CertifyHubApplication.java  # Main application class
```

## Setup Instructions

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MongoDB Atlas account
- Cloudinary account

### Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```bash
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=yourApp

# JWT Secret Key (Generate a secure random string)
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_256_bits

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Database Setup

1. Create a MongoDB Atlas cluster
2. Create a database named `certifyhub`
3. Configure network access to allow your IP
4. Create a database user with read/write permissions
5. Update the `MONGODB_URI` in your `.env` file

### Cloudinary Setup

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and API secret from the dashboard
3. Update the Cloudinary variables in your `.env` file

### Running the Application

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

The API will be available at `http://localhost:8080`

### API Documentation

Once the application is running, access the Swagger UI documentation at:
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **OpenAPI JSON:** http://localhost:8080/v3/api-docs

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Users
- `GET /api/users` - Get all users (with search/filter options)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users/units` - Get all units
- `GET /api/users/managers` - Get all managers

### Certificates
- `GET /api/certs` - Get all certificates (with pagination and filters)
- `GET /api/certs/{id}` - Get certificate by ID
- `POST /api/certs` - Create new certificate
- `PUT /api/certs/{id}` - Update certificate
- `DELETE /api/certs/{id}` - Delete certificate
- `POST /api/certs/{id}/like` - Toggle like on certificate

### Analytics
- `GET /api/analytics/categories` - Certificate counts by category
- `GET /api/analytics/issuers` - Top issuers
- `GET /api/analytics/timeline` - Certification timeline
- `GET /api/analytics/units` - Unit statistics
- `GET /api/analytics/overview` - Overview statistics

### Manager (Requires MANAGER or ADMIN role)
- `GET /api/manager/unit/{unit}/members` - Get unit members
- `GET /api/manager/unit/{unit}/certs` - Get unit certificates
- `GET /api/manager/unit/{unit}/stats` - Get unit statistics
- `GET /api/manager/unit/{unit}/export` - Export unit data as CSV

## Testing

### Example API Calls

**Register a new user:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "jobTitle": "Software Engineer",
    "unit": "Platform"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get certificates (with authentication):**
```bash
curl -X GET http://localhost:8080/api/certs \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Development

### Building

```bash
mvn clean compile
```

### Running tests

```bash
mvn test
```

### Creating a JAR

```bash
mvn clean package
```

The JAR file will be created in the `target/` directory.

## Production Deployment

### Environment Variables for Production

Set the following environment variables in your production environment:

```bash
SPRING_PROFILES_ACTIVE=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running in Production

```bash
java -jar target/certifyhub-backend-0.0.1-SNAPSHOT.jar
```

## Security

- JWT tokens expire after 24 hours by default
- Passwords are encrypted using BCrypt
- CORS is configured to allow frontend requests
- Role-based access control for manager and admin endpoints
- File uploads are validated and stored securely in Cloudinary

## Support

For issues and questions:
- Check the API documentation at `/swagger-ui.html`
- Review the application logs for error details
- Ensure all environment variables are correctly set

## License

MIT License
