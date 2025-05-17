from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime

app = FastAPI(title="E-Commerce API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    image: str
    category: str

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: str
    created_at: datetime

    class Config:
        orm_mode = True

class OrderItemBase(BaseModel):
    product_id: str
    quantity: int

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: str
    price: float

    class Config:
        orm_mode = True

class OrderBase(BaseModel):
    user_id: str
    items: List[OrderItemCreate]

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: str
    created_at: datetime
    total: float
    items: List[OrderItem]
    status: str

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str
    created_at: datetime

    class Config:
        orm_mode = True

# In-memory database
products_db = [
    {
        "id": "1",
        "name": "Premium Wireless Headphones",
        "price": 129.99,
        "image": "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "description": "Experience immersive sound with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones deliver crystal-clear audio for up to 30 hours on a single charge.",
        "category": "Electronics",
        "created_at": datetime.now()
    },
    {
        "id": "2",
        "name": "Ergonomic Office Chair",
        "price": 249.99,
        "image": "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "description": "Upgrade your workspace with our ergonomic office chair. Designed for all-day comfort, this chair features adjustable lumbar support, breathable mesh backing, and customizable height and tilt settings.",
        "category": "Furniture",
        "created_at": datetime.now()
    },
    {
        "id": "3",
        "name": "Smart Fitness Watch",
        "price": 89.99,
        "image": "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "description": "Take control of your fitness journey with our smart fitness watch. Track your workouts, monitor your heart rate, analyze your sleep patterns, and receive notifications—all from your wrist.",
        "category": "Electronics",
        "created_at": datetime.now()
    },
    {
        "id": "4",
        "name": "Organic Cotton T-Shirt",
        "price": 24.99,
        "image": "https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "description": "Feel good in our organic cotton t-shirt. Made from 100% sustainably sourced cotton, this shirt is soft, breathable, and kind to the environment.",
        "category": "Clothing",
        "created_at": datetime.now()
    },
    {
        "id": "5",
        "name": "Stainless Steel Water Bottle",
        "price": 19.99,
        "image": "https://images.pexels.com/photos/4000090/pexels-photo-4000090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "description": "Double-walled insulation keeps drinks cold for 24 hours or hot for 12 hours.",
        "category": "Kitchen",
        "created_at": datetime.now()
    },
    {
        "id": "6",
        "name": "Leather Messenger Bag",
        "price": 79.99,
        "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "description": "Handcrafted genuine leather bag with multiple compartments.",
        "category": "Accessories",
        "created_at": datetime.now()
    },
    {
        "id": "7",
        "name": "Ceramic Plant Pot",
        "price": 34.99,
        "image": "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "description": "Minimalist design perfect for indoor plants and home decor.",
        "category": "Home",
        "created_at": datetime.now()
    },
    {
        "id": "8",
        "name": "Wireless Charging Pad",
        "price": 29.99,
        "image": "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "description": "Fast charging compatible with all Qi-enabled devices.",
        "category": "Electronics",
        "created_at": datetime.now()
    }
]

users_db = []
orders_db = []

# API Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to the E-Commerce API"}

# Product routes
@app.get("/products", response_model=List[Product])
def get_products(category: Optional[str] = None, search: Optional[str] = None):
    filtered_products = products_db
    
    if category:
        filtered_products = [p for p in filtered_products if p["category"].lower() == category.lower()]
    
    if search:
        search = search.lower()
        filtered_products = [p for p in filtered_products if 
                            search in p["name"].lower() or 
                            search in p["description"].lower()]
    
    return filtered_products

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: str):
    for product in products_db:
        if product["id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail="Product not found")

@app.post("/products", response_model=Product)
def create_product(product: ProductCreate):
    new_product = product.dict()
    new_product["id"] = str(len(products_db) + 1)
    new_product["created_at"] = datetime.now()
    products_db.append(new_product)
    return new_product

# User routes
@app.post("/users", response_model=User)
def create_user(user: UserCreate):
    # Check if user already exists
    for existing_user in users_db:
        if existing_user["email"] == user.email:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )
    
    new_user = user.dict()
    new_user["id"] = str(uuid.uuid4())
    new_user["created_at"] = datetime.now()
    # In a real app, you would hash the password
    users_db.append(new_user)
    
    # Remove password from response
    del new_user["password"]
    return new_user

# Order routes
@app.post("/orders", response_model=Order)
def create_order(order: OrderCreate):
    # Validate products exist and calculate total
    total = 0
    order_items = []
    
    for item in order.items:
        product = next((p for p in products_db if p["id"] == item.product_id), None)
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with id {item.product_id} not found")
        
        item_total = product["price"] * item.quantity
        total += item_total
        
        order_items.append({
            "id": str(uuid.uuid4()),
            "product_id": item.product_id,
            "quantity": item.quantity,
            "price": product["price"]
        })
    
    new_order = {
        "id": str(uuid.uuid4()),
        "user_id": order.user_id,
        "items": order_items,
        "total": total,
        "status": "pending",
        "created_at": datetime.now()
    }
    
    orders_db.append(new_order)
    return new_order

@app.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: str):
    for order in orders_db:
        if order["id"] == order_id:
            return order
    raise HTTPException(status_code=404, detail="Order not found")

@app.get("/users/{user_id}/orders", response_model=List[Order])
def get_user_orders(user_id: str):
    user_orders = [order for order in orders_db if order["user_id"] == user_id]
    return user_orders

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)