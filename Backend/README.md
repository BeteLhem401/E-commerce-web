# Modular E-commerce Backend API

A robust, modular backend for an E-commerce application built with Node.js, Express, and MongoDB. The system follows a Controller-Service-Repository architecture and includes features like role-based authentication, product management, cart operations, and order processing with MongoDB transactions.

## Technologies Used
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **JWT** (JSON Web Tokens) for authentication
- **Bcryptjs** for password hashing
- **Express-validator** for input validation

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```
4. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Documentation

### Auth
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :---: | :---: |
| POST | `/api/auth/register` | Register a new user | No | - |
| POST | `/api/auth/login` | User login | No | - |
| GET | `/api/auth/me` | Get current user profile | Yes | Any |

### Products
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :---: | :---: |
| GET | `/api/products` | Get all products (with search/filter) | No | - |
| GET | `/api/products/:id` | Get single product by ID | No | - |

### Cart
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :---: | :---: |
| GET | `/api/cart` | View user cart | Yes | Customer |
| POST | `/api/cart` | Add item to cart | Yes | Customer |
| PUT | `/api/cart/:productId` | Update cart item quantity | Yes | Customer |
| DELETE | `/api/cart/:productId` | Remove item from cart | Yes | Customer |

### Orders
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :---: | :---: |
| POST | `/api/orders/checkout` | Create order from cart | Yes | Customer |
| GET | `/api/orders/myorders` | View user order history | Yes | Customer |
| GET | `/api/orders/:id` | Get order details | Yes | Customer |

### Admin
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :---: | :---: |
| POST | `/api/admin/products` | Add new product | Yes | Admin |
| PUT | `/api/admin/products/:id` | Update product | Yes | Admin |
| DELETE | `/api/admin/products/:id` | Delete product | Yes | Admin |
| POST | `/api/admin/categories` | Add new category | Yes | Admin |
| GET | `/api/admin/categories` | Get all categories | Yes | Admin |
| GET | `/api/admin/users` | View all users | Yes | Admin |
| GET | `/api/admin/orders` | View all orders | Yes | Admin |
| PUT | `/api/admin/orders/:id/status` | Update order status | Yes | Admin |

## Backend Architecture
The project is organized into modular layers:
- **Models**: Mongoose schemas and data validation.
- **Repositories**: Direct database interaction using the BaseRepository pattern.
- **Services**: Business logic, including transactions and calculations.
- **Controllers**: Request handling and response formatting.
- **Routes**: API endpoint definitions and middleware mapping.
- **Middleware**: Authentication, authorization, and error handling.
