# 🎂 Birthday Tracker - Backend API

A modern RESTful API for managing birthdays, built with Quarkus (Java 21) and MySQL. This backend provides secure authentication, friend management, and profile operations.

![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)
![Quarkus](https://img.shields.io/badge/Quarkus-3.29.3-blue?logo=quarkus)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue?logo=mysql)

## 🛠️ Technology Stack

### Core Framework

- **Quarkus 3.29.3** - Supersonic Subatomic Java Framework
- **Java 21** - Latest LTS version with modern features
- **Maven 3.9+** - Dependency management and build tool

### Database & ORM

- **MySQL 8.0+** - Relational database
- **Hibernate ORM with Panache** - Simplified persistence layer
- **JDBC Driver - MySQL** - Database connectivity

### Security

- **SmallRye JWT** - JWT token generation and validation
- **SmallRye JWT Build** - JWT creation utilities
- **Elytron Security** - Security framework
- **Security JPA** - Database-backed authentication
- **BCrypt** - Password hashing algorithm

### API & Documentation

- **REST (JAX-RS)** - RESTful API implementation
- **Jackson** - JSON serialization/deserialization
- **SmallRye OpenAPI** - API documentation (Swagger UI)
- **Hibernate Validator** - Bean validation

### Configuration

- **YAML Configuration** - Application configuration in YAML format

## 📋 Prerequisites

- **Java 21** or higher - [Download OpenJDK](https://adoptium.net/)
- **Maven 3.9+** - [Download Maven](https://maven.apache.org/download.cgi)
- **MySQL 8.0+** - [Download MySQL](https://dev.mysql.com/downloads/)

Verify installations:

```bash
java -version
mvn -version
mysql --version
```

## 🚀 Getting Started

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE birthdaytracker_db;
CREATE USER 'birthdayuser'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON birthdaytracker_db.* TO 'birthdayuser'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.exemple .env
```

Edit `.env` with your settings:

```bash
# Database Configuration
DB_KIND=mysql
DB_USERNAME=birthdayuser
DB_PASSWORD=your_password
DB_URL=jdbc:mysql://localhost:3306/birthdaytracker_db?createDatabaseIfNotExist=true

# JWT Configuration (generate with: openssl rand -base64 64)
JWT_ISSUER=birthday-tracker
JWT_SIGN_KEY=your-very-secure-random-key-at-least-256-bits-long

# Application Configuration
LOG_SQL=true

# CORS Configuration
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3. Run in Development Mode

```bash
./mvnw quarkus:dev
```

The application will start on `http://localhost:8080` with:

- **Live coding** - Changes are automatically reloaded
- **Dev UI** - Available at `http://localhost:8080/q/dev/`
- **Swagger UI** - API documentation at `http://localhost:8080/q/swagger-ui`

### 4. Access Points

- **API Base URL**: `http://localhost:8080/api`
- **Swagger UI**: `http://localhost:8080/q/swagger-ui`
- **Health Check**: `http://localhost:8080/q/health`
- **Metrics**: `http://localhost:8080/q/metrics`
- **Dev UI**: `http://localhost:8080/q/dev/`

## 📁 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/krills/
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── AuthRequestDTO.java
│   │   │   │   ├── AuthResponseDTO.java
│   │   │   │   ├── RegisterRequestDTO.java
│   │   │   │   ├── FriendRequestDTO.java
│   │   │   │   ├── FriendResponseDTO.java
│   │   │   │   ├── ProfileRequestDTO.java
│   │   │   │   ├── ProfileResponseDTO.java
│   │   │   │   └── ChangePasswordRequestDTO.java
│   │   │   │
│   │   │   ├── entity/           # JPA Entities
│   │   │   │   ├── User.java
│   │   │   │   └── Friend.java
│   │   │   │
│   │   │   ├── repository/       # Data Access Layer
│   │   │   │   ├── UserRepository.java
│   │   │   │   └── FriendRepository.java
│   │   │   │
│   │   │   ├── service/          # Business Logic
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── FriendService.java
│   │   │   │   └── ProfileService.java
│   │   │   │
│   │   │   ├── resource/         # REST Controllers
│   │   │   │   ├── AuthResource.java
│   │   │   │   ├── FriendResource.java
│   │   │   │   └── ProfileResource.java
│   │   │   │
│   │   │   ├── mapper/           # Entity-DTO Mappers
│   │   │   │   ├── UserMapper.java
│   │   │   │   └── FriendMapper.java
│   │   │   │
│   │   │   ├── validation/       # Custom Validators
│   │   │   │   ├── ValidPasswordChange.java
│   │   │   │   └── PasswordChangeValidator.java
│   │   │   │
│   │   │   └── exception/        # Exception Handling
│   │   │       ├── GlobalExceptionHandler.java
│   │   │       └── ErrorResponse.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml   # Application Configuration
│   │       └── import.sql        # Initial Data (optional)
│   │
│   └── test/                     # Test Classes
│
├── .env.exemple                  # Environment Template
├── pom.xml                       # Maven Configuration
└── README.md                     # This file
```

## 🔌 API Endpoints

### Authentication Endpoints (Public)

#### Register New User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1990-01-15"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe"
}
```

### Friend Endpoints (Protected)

All friend endpoints require authentication. Include JWT token in Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

#### Get All Friends

```http
GET /api/friends

Response: 200 OK
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "firstName": "Alice",
    "lastName": "Smith",
    "birthDate": "1995-03-20",
    "daysUntilBirthday": 45,
    "nextBirthday": "2026-03-20",
    "isBirthdayToday": false
  }
]
```

#### Get Upcoming Birthdays (Sorted)

```http
GET /api/friends/upcoming

Response: 200 OK
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "firstName": "Bob",
    "lastName": "Johnson",
    "birthDate": "1988-12-01",
    "daysUntilBirthday": 3,
    "nextBirthday": "2025-12-01",
    "isBirthdayToday": false
  }
]
```

#### Create Friend

```http
POST /api/friends
Content-Type: application/json

{
  "firstName": "Alice",
  "lastName": "Smith",
  "birthDate": "1995-03-20"
}

Response: 200 OK
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "Alice",
  "lastName": "Smith",
  "birthDate": "1995-03-20",
  "daysUntilBirthday": 45,
  "nextBirthday": "2026-03-20",
  "isBirthdayToday": false
}
```

#### Update Friend

```http
PUT /api/friends/{id}
Content-Type: application/json

{
  "firstName": "Alice",
  "lastName": "Johnson",
  "birthDate": "1995-03-20"
}

Response: 200 OK
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "Alice",
  "lastName": "Johnson",
  "birthDate": "1995-03-20",
  "daysUntilBirthday": 45,
  "nextBirthday": "2026-03-20",
  "isBirthdayToday": false
}
```

#### Delete Friend

```http
DELETE /api/friends/{id}

Response: 204 No Content
```

### Profile Endpoints (Protected)

#### Get User Profile

```http
GET /api/me

Response: 200 OK
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1990-01-15"
}
```

#### Update Profile

```http
PUT /api/me
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1990-01-15"
}

Response: 200 OK
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1990-01-15"
}
```

#### Change Password

```http
PATCH /api/me/password
Content-Type: application/json

{
  "oldPassword": "OldPass123!",
  "newPassword": "NewSecurePass456!",
  "confirmNewPassword": "NewSecurePass456!"
}

Response: 200 OK
{
  "message": "Password changed successfully"
}
```

#### Delete Account

```http
DELETE /api/me

Response: 204 No Content
```

## 🔐 Security Features

### JWT Authentication

- Token-based authentication using RS256 algorithm
- 24-hour token expiration
- Tokens include user ID, username, and roles
- Issuer validation

### Password Security

- BCrypt hashing with salt
- Minimum 8 characters
- Must contain:
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one digit
  - At least one special character (@$!%\*?&)

### Authorization

- Protected routes require valid JWT token
- User can only access their own data
- Friends are user-specific (can't access others' friends)

### CORS Configuration

- Configurable allowed origins
- Supports multiple development and production URLs
- Credentials support enabled

## ✅ Validation Rules

### User Registration

- **Username**: Required, unique
- **Email**: Required, valid email format, unique
- **Password**: Required, 8+ characters, complexity rules
- **First Name**: Required, 1-255 characters
- **Last Name**: Required, 1-255 characters
- **Birth Date**: Required, must be in the past

### Friend Creation

- **First Name**: Required
- **Last Name**: Required
- **Birth Date**: Required, must be in the past

### Password Change

- **Old Password**: Required
- **New Password**: Required, complexity rules
- **Confirm Password**: Required, must match new password
- New password must be different from old password

## 🧪 Testing

Run tests:

```bash
./mvnw test
```

Run tests with coverage:

```bash
./mvnw verify
```

## 📦 Building for Production

### Package Application

```bash
./mvnw clean package
```

This creates:

- `target/quarkus-app/quarkus-run.jar` - Fast-jar (recommended)
- Dependencies in `target/quarkus-app/lib/`

### Run Production Build

```bash
java -jar target/quarkus-app/quarkus-run.jar
```

### Create Uber-JAR (Optional)

```bash
./mvnw package -Dquarkus.package.jar.type=uber-jar
java -jar target/*-runner.jar
```

## ⚙️ Configuration

### application.yml

The main configuration file is located at `src/main/resources/application.yml`:

```yaml
quarkus:
  datasource:
    db-kind: ${DB_KIND}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
    jdbc:
      url: ${DB_URL}

  hibernate-orm:
    log:
      sql: ${LOG_SQL:false}
      format-sql: true
    schema-management:
      strategy: update # Auto-update database schema

  http:
    cors:
      enabled: true
      origins: ${CORS_ORIGINS}
      methods: GET,POST,PUT,PATCH,DELETE,OPTIONS
      headers: accept,authorization,content-type,x-requested-with
      credentials: true

    auth:
      permission:
        authenticated:
          paths: /api/*
          policy: authenticated
        public:
          paths: /api/auth/*
          policy: permit

mp:
  jwt:
    verify:
      issuer: ${JWT_ISSUER}

smallrye:
  jwt:
    sign:
      key:
        value: ${JWT_SIGN_KEY}
```

### Environment Variables

All sensitive configuration is externalized to environment variables:

| Variable       | Description              | Example                                          |
| -------------- | ------------------------ | ------------------------------------------------ |
| `DB_KIND`      | Database type            | `mysql`                                          |
| `DB_USERNAME`  | Database user            | `birthdayuser`                                   |
| `DB_PASSWORD`  | Database password        | `your_secure_password`                           |
| `DB_URL`       | JDBC connection URL      | `jdbc:mysql://localhost:3306/birthdaytracker_db` |
| `JWT_ISSUER`   | JWT token issuer         | `birthday-tracker`                               |
| `JWT_SIGN_KEY` | JWT signing key (base64) | Generate with `openssl rand -base64 64`          |
| `LOG_SQL`      | Enable SQL logging       | `true` or `false`                                |
| `CORS_ORIGINS` | Allowed CORS origins     | `http://localhost:5173,http://localhost:3000`    |

## 🐛 Troubleshooting

### Database Connection Issues

**Problem**: Application can't connect to MySQL

```
Solution:
1. Check MySQL is running: mysql -u root -p
2. Verify database exists: SHOW DATABASES;
3. Check credentials in .env file
4. Ensure MySQL port is accessible
```

### Port Already in Use

**Problem**: Port 8080 is already in use

```bash
Solution:
# Find process using port 8080
sudo lsof -i :8080

# Kill the process or change port in application.yml
quarkus:
  http:
    port: 8081
```

### JWT Token Issues

**Problem**: Invalid JWT token

```
Solution:
1. Ensure JWT_SIGN_KEY is set in .env
2. Generate new key: openssl rand -base64 64
3. Restart application
4. Generate new token by logging in again
```

### Schema Migration Issues

**Problem**: Database schema conflicts

```bash
Solution:
# Drop and recreate database
mysql -u root -p
DROP DATABASE birthdaytracker_db;
CREATE DATABASE birthdaytracker_db;

# Restart application (auto-creates tables)
./mvnw quarkus:dev
```

## 📚 Additional Resources

### Quarkus Guides

- [Getting Started](https://quarkus.io/guides/getting-started)
- [REST API](https://quarkus.io/guides/rest)
- [Hibernate ORM with Panache](https://quarkus.io/guides/hibernate-orm-panache)
- [Security with JWT](https://quarkus.io/guides/security-jwt)
- [OpenAPI and Swagger UI](https://quarkus.io/guides/openapi-swaggerui)

### Database

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Hibernate ORM](https://hibernate.org/orm/documentation/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Otmane Touhami**

- GitHub: [@OtmaneTouhami](https://github.com/OtmaneTouhami)

## Provided Code

### YAML Config

Configure your application with YAML

[Related guide section...](https://quarkus.io/guides/config-reference#configuration-examples)

The Quarkus application configuration is located in `src/main/resources/application.yml`.

### Hibernate ORM

Create your first JPA entity

[Related guide section...](https://quarkus.io/guides/hibernate-orm)

[Related Hibernate with Panache section...](https://quarkus.io/guides/hibernate-orm-panache)

### REST

Easily start your REST Web Services

[Related guide section...](https://quarkus.io/guides/getting-started-reactive#reactive-jax-rs-resources)
