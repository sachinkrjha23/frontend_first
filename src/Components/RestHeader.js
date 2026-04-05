import { useSelector } from "react-redux";
import { Link } from "react-router";  

export default function RestHeader() {

    const counter = useSelector(state=> state.cartslice.count);
    
    return (
        <div className="container mx-auto py-4 px-8 bg-gray-200 flex justify-between items-center">
            <Link to="/" className="text-orange-600 font-bold text-2xl">
                Swiggy
            </Link>

            <div className="flex items-center gap-8">
                <a target="_blank" href="https://www.swiggy.com/corporate/" className="text-gray-700 font-semibold">
                    Swiggy Corporate
                </a>
                
                <a target="_blank" href="https://www.swiggy.com/corporate/" className="border border-gray-700 py-2 px-4 rounded-xl">
                    Sign in
                </a>
                
                {/* Changed from div to Link */}
                <Link to="/checkout" className="flex items-center gap-2 text-black py-2 px-4 rounded-xl border hover:bg-gray-100 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <span>Cart ({counter})</span>
                </Link>
            </div>
        </div>
    );
}