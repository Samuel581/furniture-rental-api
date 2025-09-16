# 🪑 Furniture Rental API

A comprehensive NestJS-based REST API for managing furniture rental services, supporting both individual furniture pieces and predefined furniture sets (combos).

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Furniture Management**: Complete CRUD operations for furniture inventory
- **Combo Management**: Predefined furniture sets with individual item tracking
- **Client Management**: Customer information with location-based data
- **Rental Lifecycle**: Full rental process from creation to completion
- **Stock Tracking**: Automatic inventory management with real-time updates
- **Reporting System**: Analytics and insights for business operations
- **Location Services**: GPS coordinates and address management for clients

## 🛠 Technologies

- **Backend**: NestJS (Node.js framework)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript
- **Validation**: class-validator, class-transformer
- **Containerization**: Docker

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v13 or higher) - *Skip if using Docker*
- **Docker** (optional, for containerized setup)
- **npm** or **yarn** package manager

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd furniture-rental-api
```

### 2. Install Dependencies

```bash
# Using yarn (recommended)
yarn install

# Or using npm
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/furniture_rental_db"

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

## 🗄 Database Setup

The application uses PostgreSQL with Prisma ORM. The database schema includes:

- **Furniture**: Individual furniture items with stock tracking
- **Combos**: Predefined furniture sets
- **Clients**: Customer information with location data
- **Rentals**: Rental transactions with status tracking
- **RentalItems**: Junction table for rental-furniture relationships

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Start with hot reload
yarn start:dev

# Or with npm
npm run start:dev
```

### Production Mode

```bash
# Build the application
yarn build

# Start in production mode
yarn start:prod
```

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
Currently, the API does not require authentication. This will be added in future versions.

---

### 🪑 Furniture Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/furniture` | Get all furniture items | `type`, `color`, `isActive` |
| `GET` | `/furniture/:id` | Get furniture by ID | - |
| `POST` | `/furniture` | Create new furniture | - |
| `PATCH` | `/furniture/:id` | Update furniture | - |

**Example Request:**
```bash
GET /furniture?type=chair&color=black&isActive=true
```

---

### 🛋 Combo Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/combos` | Get all combos | `isActive` |
| `GET` | `/combos/:id` | Get combo by ID | - |
| `POST` | `/combos` | Create new combo | - |

---

### 👥 Client Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/clients` | Get all clients | `isActive` |
| `GET` | `/clients/:id` | Get client by ID | - |
| `POST` | `/clients` | Create new client | - |
| `PATCH` | `/clients/:id` | Update client | - |

---

### 📋 Rental Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/rentals` | Get all rentals | Query: `status`, `startDate`, `endDate` |
| `GET` | `/rentals/:id` | Get rental by ID | - |
| `GET` | `/rentals/client/:id` | Get rentals by client | - |
| `POST` | `/rentals` | Create new rental | See example below |
| `PATCH` | `/rentals/:id/deliver` | Mark as delivered | - |
| `PATCH` | `/rentals/:id/done` | Mark as completed | - |
| `PATCH` | `/rentals/:id/cancel` | Cancel rental | - |
| `PATCH` | `/rentals/:id/deposit` | Add deposit amount | `{ "amount": 100 }` |

**Create Rental Example:**
```json
{
  "clientId": "uuid",
  "startDate": "2024-01-15",
  "endDate": "2024-01-20",
  "depositAmount": 200,
  "notes": "Special delivery instructions",
  "secondaryDeliveryAddress": "123 Main St",
  "items": [
    {
      "furnitureId": "uuid",
      "quantity": 2
    },
    {
      "comboId": "uuid",
      "quantity": 1
    }
  ]
}
```

---

### 📊 Report Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/report/rentalsCount` | Count of rentals | `month`, `year` |
| `GET` | `/report/totalGains` | Total revenue | `month`, `year` |
| `GET` | `/report/activeUsers` | Active clients count | - |
| `GET` | `/report/bestClients` | Top 5 clients by spending | - |

**Report Query Parameters:**
- `month`: 1-12 (optional)
- `year`: 2020-2030 (optional)

---

## 🏗 Project Structure

```
src/
├── app.module.ts              # Main application module
├── main.ts                    # Application entry point
├── prisma.service.ts          # Prisma database service
├── client/                    # Client management module
│   ├── client.controller.ts
│   ├── client.service.ts
│   ├── dto/                   # Data Transfer Objects
│   └── entities/              # TypeScript interfaces
├── furniture/                 # Furniture management module
├── combo/                     # Combo management module
├── rental/                    # Rental management module
└── report/                    # Reporting and analytics module
```

## 🔧 Development

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (careful!)
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy
```

### Code Quality

```bash
# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Ensure database exists

2. **Migration Errors**
   - Run `npx prisma migrate reset` (development only)
   - Check for schema conflicts

3. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing process: `lsof -ti:3000 | xargs kill`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Made with ❤️ using NestJS**