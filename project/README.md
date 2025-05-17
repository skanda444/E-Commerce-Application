# ShopEase E-Commerce Application

A mini full-stack e-commerce web application built with FastAPI (Python) for the backend and React (TypeScript) for the frontend.

## Features

- Product browsing and searching
- Product categories and filtering
- Shopping cart functionality
- Checkout process
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- FastAPI (Python)
- Pydantic for data validation
- In-memory data storage (for demonstration purposes)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```
   npm install
   ```
3. Install backend dependencies:
   ```
   pip install -r backend/requirements.txt
   ```

### Running the Application

1. Start the frontend development server:
   ```
   npm run dev
   ```

2. Start the backend server:
   ```
   npm run backend
   ```

## API Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/{product_id}` - Get a specific product
- `POST /products` - Create a new product

### Users
- `POST /users` - Create a new user

### Orders
- `POST /orders` - Create a new order
- `GET /orders/{order_id}` - Get a specific order
- `GET /users/{user_id}/orders` - Get all orders for a user

## Project Structure

```
├── backend/
│   ├── main.py           # FastAPI application
│   └── requirements.txt  # Python dependencies
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context for state management
│   ├── pages/            # Page components
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── package.json          # Node.js dependencies
└── README.md             # Project documentation
```