# EcoShop Frontend - Modern E-commerce UI

A beautiful, responsive, and feature-rich E-commerce frontend built with React, Tailwind CSS, and Axios. Designed to integrate seamlessly with the EcoShop Backend.

## Features
- **Modern UI/UX**: Clean design with soft colors, professional spacing, and smooth animations.
- **Full Responsiveness**: Optimized for mobile, tablet, and desktop.
- **State Management**: Using React Context API for Authentication and Cart management.
- **Product Filtering**: Real-time search and category filtering.
- **Shopping Cart**: Full CRUD operations on cart items with real-time updates.
- **Secure Checkout**: Shipping and payment simulation.
- **Admin Dashboard**: Comprehensive management of products, orders, and users.
- **User Dashboard**: Order history tracking with status indicators.

## Tech Stack
- **React 19**
- **Tailwind CSS** (Styling)
- **React Router 7** (Navigation)
- **Axios** (API requests)
- **Lucide React** (Premium Icons)
- **Vite** (Build Tool)

## Setup Instructions

1. **Navigate to the frontend directory**:
   ```bash
   cd Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the `Frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## Folder Structure
- `src/components/`: Reusable UI components (Navbar, Footer, ProductCard, etc.)
- `src/pages/`: Main application pages.
- `src/context/`: Authentication and Cart state providers.
- `src/services/`: Axios configuration and API interceptors.
- `src/assets/`: Static assets and global styles.

## API Integration Examples
All API calls are centralized in the `services/api.js` instance, which automatically handles:
- Base URL configuration.
- JWT injection from `localStorage`.
- Content-Type headers.
