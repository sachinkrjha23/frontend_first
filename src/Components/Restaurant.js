import { useEffect, useState } from "react";
import RestCard from "./RestCard";
import Shimmer from "./Shimmer";

// Create cache outside component
let cachedRestaurants = null;

export default function Restaurant(){
   
    const [RestData, setRestData] = useState([]);
    const [filteredRestData, setFilteredRestData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filter states
    const [ratingFilter, setRatingFilter] = useState(false);
    const [fastDeliveryFilter, setFastDeliveryFilter] = useState(false);
    const [pureVegFilter, setPureVegFilter] = useState(false);

    useEffect(() => {
        async function fetchData() {
            // If data is already cached, use it without shimmer
            if (cachedRestaurants) {
                setRestData(cachedRestaurants);
                setFilteredRestData(cachedRestaurants);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const proxyServer = "https://cors-anywhere.herokuapp.com/"
                const swiggyAPI = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true";
                const response = await fetch(proxyServer + swiggyAPI);
                const data = await response.json();
                const restaurants = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
                
                // Store in cache
                cachedRestaurants = restaurants;
                
                setRestData(restaurants);
                setFilteredRestData(restaurants);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch restaurants:", error);
                setLoading(false);
            }
        }
        fetchData();
    }, []); // Empty dependency array - only runs once on mount

    // Apply filters whenever any filter changes
    useEffect(() => {
        if (!RestData.length) return;
        
        let filtered = [...RestData];
        
        // Rating 4.5+ filter
        if (ratingFilter) {
            filtered = filtered.filter(rest => {
                const rating = rest?.info?.avgRating;
                return rating >= 4.5;
            });
        }
        
        // Fast Delivery filter (delivery time <= 30 mins)
        if (fastDeliveryFilter) {
            filtered = filtered.filter(rest => {
                const deliveryTime = rest?.info?.sla?.deliveryTime;
                return deliveryTime <= 30;
            });
        }
        
        // Pure Veg filter
        if (pureVegFilter) {
            filtered = filtered.filter(rest => {
                return rest?.info?.veg === true || 
                       rest?.info?.isVeg === true;
            });
        }
        
        setFilteredRestData(filtered);
    }, [ratingFilter, fastDeliveryFilter, pureVegFilter, RestData]);

    const clearAllFilters = () => {
        setRatingFilter(false);
        setFastDeliveryFilter(false);
        setPureVegFilter(false);
    };

    if (loading) return <Shimmer />;

    const ratingCount = RestData.filter(r => r?.info?.avgRating >= 4.5).length;
    const deliveryCount = RestData.filter(r => r?.info?.sla?.deliveryTime <= 30).length;
    const vegCount = RestData.filter(r => r?.info?.veg === true || r?.info?.isVeg === true).length;

    return (
        <div className="w-[80%] mx-auto mt-20">
            {/* Filter Buttons Section */}
            <div className="flex flex-wrap gap-3 mb-6 pb-4 border-b border-gray-200">
                <button
                    onClick={() => setRatingFilter(!ratingFilter)}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                        ratingFilter
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    ⭐ Rating 4.5+
                </button>
                
                <button
                    onClick={() => setFastDeliveryFilter(!fastDeliveryFilter)}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                        fastDeliveryFilter
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    🚚 Fast Delivery (≤30 min)
                </button>
                
                <button
                    onClick={() => setPureVegFilter(!pureVegFilter)}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                        pureVegFilter
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    🌱 Pure Veg
                </button>
                
                {(ratingFilter || fastDeliveryFilter || pureVegFilter) && (
                    <button
                        onClick={clearAllFilters}
                        className="px-5 py-2 rounded-full font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                        ✕ Clear All
                    </button>
                )}
            </div>
            
            {/* Show counts ONLY when filters are active */}
            {(ratingFilter || fastDeliveryFilter || pureVegFilter) && (
                <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium">Filter summary:</span>
                    {ratingFilter && <span className="ml-3">⭐ Rating 4.5+ ({ratingCount} available)</span>}
                    {fastDeliveryFilter && <span className="ml-3">🚚 Fast delivery ({deliveryCount} available)</span>}
                    {pureVegFilter && <span className="ml-3">🌱 Pure veg ({vegCount} available)</span>}
                </div>
            )}
            
            <div className="mb-4 text-sm text-gray-600">
                Showing {filteredRestData.length} of {RestData.length} restaurants
            </div>
            
            {filteredRestData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredRestData.map((restInfo) => (
                        <RestCard key={restInfo?.info?.id} restInfo={restInfo} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No restaurants match your filters.</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your filter criteria</p>
                    <button 
                        onClick={clearAllFilters}
                        className="mt-4 text-blue-600 underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}