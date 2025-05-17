import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  details?: string[];
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    // Simulate API call to fetch product details
    setTimeout(() => {
      // This would normally be fetched from an API
      const dummyProducts: Record<string, Product> = {
        "1": {
          id: 1,
          name: "Premium Wireless Headphones",
          price: 129.99,
          image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          description: "Experience immersive sound with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones deliver crystal-clear audio for up to 30 hours on a single charge.",
          category: "Electronics",
          details: [
            "Active noise cancellation",
            "30-hour battery life",
            "Bluetooth 5.0 connectivity",
            "Comfortable over-ear design",
            "Built-in microphone for calls",
            "Quick charge: 5 hours of playback from 10 minutes of charging"
          ]
        },
        "2": {
          id: 2,
          name: "Ergonomic Office Chair",
          price: 249.99,
          image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          description: "Upgrade your workspace with our ergonomic office chair. Designed for all-day comfort, this chair features adjustable lumbar support, breathable mesh backing, and customizable height and tilt settings.",
          category: "Furniture",
          details: [
            "Adjustable lumbar support",
            "Breathable mesh back",
            "Padded seat cushion",
            "Adjustable armrests",
            "360° swivel",
            "Weight capacity: 300 lbs",
            "5-year warranty"
          ]
        },
        "3": {
          id: 3,
          name: "Smart Fitness Watch",
          price: 89.99,
          image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          description: "Take control of your fitness journey with our smart fitness watch. Track your workouts, monitor your heart rate, analyze your sleep patterns, and receive notifications—all from your wrist.",
          category: "Electronics",
          details: [
            "Heart rate monitoring",
            "Sleep tracking",
            "Step counter and distance tracking",
            "Water-resistant up to 50m",
            "7-day battery life",
            "Compatible with iOS and Android",
            "Multiple sport modes"
          ]
        },
        "4": {
          id: 4,
          name: "Organic Cotton T-Shirt",
          price: 24.99,
          image: "https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          description: "Feel good in our organic cotton t-shirt. Made from 100% sustainably sourced cotton, this shirt is soft, breathable, and kind to the environment.",
          category: "Clothing",
          details: [
            "100% organic cotton",
            "Sustainably sourced materials",
            "Pre-shrunk fabric",
            "Relaxed fit",
            "Available in multiple colors",
            "Machine washable",
            "Fair trade certified"
          ]
        }
      };
      
      setProduct(dummyProducts[id || "1"] || null);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div>
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ChevronLeft className="h-5 w-5 mr-1" /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/products"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ChevronLeft className="h-5 w-5 mr-1" /> Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-contain rounded-lg"
            style={{ maxHeight: '500px' }}
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5" fill={i < 4 ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-gray-600">(24 reviews)</span>
          </div>
          
          <p className="text-2xl font-bold text-indigo-600 mb-6">
            ${product.price.toFixed(2)}
          </p>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-t border-b border-gray-300 py-1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button className="flex-1 border border-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
              <Heart className="h-5 w-5 mr-2" />
              Add to Wishlist
            </button>
          </div>
          
          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Product Details</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {product.details?.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          
          {/* Share */}
          <div className="mt-6 flex items-center">
            <span className="text-gray-700 mr-3">Share:</span>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;