import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function RestHeader() {
    const counter = useSelector(state=> state.cartslice.count);
    
    return (
        <div className="container mx-auto py-3 px-4 md:py-4 md:px-8 bg-gray-200 flex flex-wrap justify-between items-center gap-3">
            <Link to="/" className="text-orange-600 font-bold text-xl md:text-2xl">
                Swiggy
            </Link>

            <div className="flex items-center gap-3 md:gap-8 flex-wrap">
                <a target="_blank" href="https://www.swiggy.com/corporate/" className="text-gray-700 font-semibold text-sm md:text-base">
                    Swiggy Corporate
                </a>
                
                <a target="_blank" href="https://www.swiggy.com/corporate/" className="border border-gray-700 py-1 px-2 md:py-2 md:px-4 rounded-xl text-sm md:text-base">
                    Sign in
                </a>
                
                <Link to="/checkout" className="flex items-center gap-1 md:gap-2 text-black py-1 px-2 md:py-2 md:px-4 rounded-xl border hover:bg-gray-100 transition text-sm md:text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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