import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { IncrementItems, DecrementItems } from "../Stored/CartSlicer";

export default function Checkout() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartslice.items);
    const totalCount = useSelector(state => state.cartslice.count);
    
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        const price = item.defaultPrice ? item.defaultPrice / 100 : item.price / 100;
        return total + (price * item.quantity);
    }, 0);

    if (cartItems.length === 0) {
        return (
            <div className="w-[80%] mx-auto mt-20 text-center">
                <div className="bg-gray-50 rounded-lg p-12">
                    <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty!</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
                    <Link to="/restaurant" className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
                        Browse Restaurants
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[80%] mx-auto mt-10 mb-20">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items Section */}
                <div className="lg:w-[65%]">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                            <h2 className="text-xl font-semibold">Cart Items ({totalCount})</h2>
                        </div>
                        
                        <div className="divide-y divide-gray-200">
                            {cartItems.map((item) => {
                                const price = item.defaultPrice ? item.defaultPrice / 100 : item.price / 100;
                                const itemTotal = price * item.quantity;
                                const isVeg = item?.isVeg === 1;
                                
                                return (
                                    <div key={item.id} className="flex justify-between items-center p-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                {isVeg ? (
                                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <circle cx="10" cy="10" r="8" fill="#4CAF50" />
                                                        <circle cx="10" cy="10" r="3" fill="white" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <rect x="4" y="4" width="12" height="12" rx="2" fill="#DC3545" />
                                                    </svg>
                                                )}
                                                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                            </div>
                                            <p className="text-gray-600">₹{price.toFixed(2)}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                                                <button 
                                                    onClick={() => dispatch(DecrementItems(item))}
                                                    className="text-green-600 font-bold text-xl px-2 hover:bg-green-50 rounded"
                                                >
                                                    -
                                                </button>
                                                <span className="font-semibold text-gray-700 min-w-7.5 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button 
                                                    onClick={() => dispatch(IncrementItems(item))}
                                                    className="text-green-600 font-bold text-xl px-2 hover:bg-green-50 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="text-lg font-semibold text-gray-800 min-w-20 text-right">
                                                ₹{itemTotal.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                
                {/* Order Summary Section */}
                <div className="lg:w-[35%]">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-5">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-3">Order Summary</h2>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal ({totalCount} items)</span>
                                <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery Fee</span>
                                <span className="text-green-600 font-semibold">FREE</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">GST & Restaurant Charges</span>
                                <span className="font-semibold">₹{(totalPrice * 0.05).toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-3 mt-3">
                                <div className="flex justify-between">
                                    <span className="text-lg font-bold">Total Amount</span>
                                    <span className="text-xl font-bold text-orange-600">
                                        ₹{(totalPrice + (totalPrice * 0.05)).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                            Proceed to Payment
                        </button>
                        
                        <Link to="/restaurant" className="block text-center mt-4 text-orange-500 hover:underline">
                            ← Add More Items
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}   