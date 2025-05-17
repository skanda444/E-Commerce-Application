import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center justify-center p-6 bg-indigo-100 text-indigo-600 rounded-full mb-6">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link
          to="/products"
          className="inline-flex items-center bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Start Shopping <ChevronRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Cart Items ({items.length})</h2>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.product.id} className="p-6 flex flex-col sm:flex-row">
                  <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0 flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="sm:ml-6 flex-grow">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium">
                        <Link to={`/products/${item.product.id}`} className="hover:text-indigo-600">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.product.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 flex items-center"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5 mr-1" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="p-6 border-t border-gray-200">
              <Link
                to="/products"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <ChevronLeft className="h-5 w-5 mr-1" /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(totalPrice * 0.07).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>${(totalPrice + totalPrice * 0.07).toFixed(2)}</span>
              </div>
            </div>
            
            <Link
              to="/checkout"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center font-semibold"
            >
              Proceed to Checkout <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">We Accept</h3>
              <div className="flex space-x-2">
                <div className="p-2 border border-gray-200 rounded">Visa</div>
                <div className="p-2 border border-gray-200 rounded">Mastercard</div>
                <div className="p-2 border border-gray-200 rounded">PayPal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;