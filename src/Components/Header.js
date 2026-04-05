import { Link } from "react-router";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-[#ff5200] font-serif">
            {/* Top Navigation Bar */}
            <div className="flex justify-between items-center container mx-auto py-4 px-4 md:py-8">
                <img className="w-32 h-10 md:w-40 md:h-12" src="https://res.cloudinary.com/dutdah0l9/image/upload/v1720058694/Swiggy_logo_bml6he.png" alt="Swiggy Logo" />
                
                {/* Hamburger menu button for mobile */}
                <button 
                    className="block md:hidden text-white text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex text-white text-base font-bold gap-6 lg:gap-15 items-center">
                    <a target="_blank" href="https://www.swiggy.com/corporate/">Swiggy Corporate</a>
                    <a target="_blank" href="https://partner.swiggy.com/login#/swiggy">Partner with Us</a>
                    <a className="border border-white py-2 px-3 lg:py-3 lg:px-4 rounded-2xl" target="_blank" href="https://www.swiggy.com/corporate/">Get The App</a>
                    <a className="border border-black bg-black py-2 px-3 lg:py-3 lg:px-4 rounded-2xl" target="_blank" href="https://www.swiggy.com/corporate/">Sign in</a>
                </div>
            </div>
            
            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#ff5200] px-4 pb-4 flex flex-col gap-3 text-white">
                    <a target="_blank" href="https://www.swiggy.com/corporate/">Swiggy Corporate</a>
                    <a target="_blank" href="https://partner.swiggy.com/login#/swiggy">Partner with Us</a>
                    <a className="border border-white py-2 px-3 rounded-2xl text-center" target="_blank" href="https://www.swiggy.com/corporate/">Get The App</a>
                    <a className="border border-black bg-black py-2 px-3 rounded-2xl text-center" target="_blank" href="https://www.swiggy.com/corporate/">Sign in</a>
                </div>
            )}

            {/* Hero Section */}
            <div className="pt-8 md:pt-16 pb-6 md:pb-8 relative px-4">
                <img className="h-50 w-30 md:h-110 md:w-60 absolute top-0 left-0 opacity-50 md:opacity-100" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png" alt="Vegetables" />
                <img className="h-50 w-30 md:h-110 md:w-60 absolute top-0 right-0 opacity-50 md:opacity-100" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png" alt="Sushi" />
                
                <div className="max-w-[95%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold container mx-auto text-center">
                    Order Food and groceries. Discover best restaurants. Swiggy it!
                </div>
                
                <div className="max-w-[90%] md:max-w-[80%] lg:max-w-[70%] container mx-auto flex flex-col sm:flex-row gap-3 md:gap-5 mt-6 md:mt-10">
                    <input className="bg-white w-full sm:w-[45%] lg:w-[40%] text-base md:text-lg lg:text-xl px-4 md:px-6 py-3 md:py-4 rounded-2xl" placeholder="Delhi, India" />
                    <input className="bg-white w-full sm:w-[55%] lg:w-[60%] text-base md:text-lg lg:text-xl px-4 md:px-6 py-3 md:py-4 rounded-2xl" placeholder="Search for restaurant and items for more" />
                </div>
            </div>

            {/* Banner Images Section - Fully Responsive */}
            <div className="max-w-[95%] md:max-w-[90%] lg:max-w-[85%] container mx-auto pb-6 md:pb-8">
                <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5">
                    <Link to="/restaurant" className="w-[48%] sm:w-auto">
                        <img className="w-full sm:w-44 md:w-52 lg:w-56 xl:w-60" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/fa01e85b-3057-482d-9523-5289722b1df2_Food4BU.png" alt="Food" />
                    </Link>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        alert("🛒 Instamart grocery - Coming soon!");
                    }} className="w-[48%] sm:w-auto">
                        <img className="w-full sm:w-44 md:w-52 lg:w-56 xl:w-60" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/16/ca34e375-f1bd-4a2e-a3e7-0a20833be83b_IM4BU1.png" alt="Instamart" />
                    </a>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        alert("🍽️ Dineout restaurants - Coming soon!");
                    }} className="w-[48%] sm:w-auto">
                        <img className="w-full sm:w-44 md:w-52 lg:w-56 xl:w-60" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/76c30e5a-8adb-4795-bf5b-fa64e9e9e1d3_DO4BU.png" alt="Dineout" />
                    </a>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        alert("✨ Genie delivery - Coming soon!");
                    }} className="w-[48%] sm:w-auto">
                        <img className="w-full sm:w-44 md:w-52 lg:w-56 xl:w-60" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/31/14033c0b-8907-420b-b72a-d26cfa68dc7b_Genie4BU.png" alt="Genie" />
                    </a>
                </div>
            </div>
        </header>
    );
}