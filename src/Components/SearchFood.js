import { useState, useEffect } from "react";
import { useParams } from "react-router";
import RestInfo from "./RestInfo";

export default function SearchFood(){
    
    const {id} = useParams();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [allDishes, setAllDishes] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://swiggy-proxy-hrcb.onrender.com/api/menu?restaurantId=${id}`);
                const data = await response.json();
                
                // Dynamically search for menu cards (same as RestaurantMenu)
                let menuCards = null;
                if (data?.data?.cards) {
                    for (let i = 0; i < data.data.cards.length; i++) {
                        const card = data.data.cards[i];
                        if (card?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
                            menuCards = card.groupedCard.cardGroupMap.REGULAR.cards;
                            break;
                        }
                    }
                }
                
                // If found, filter categories with titles
                let filterData = [];
                if (menuCards) {
                    filterData = menuCards.filter((items) => 'title' in items?.card?.card);
                } else {
                    // Fallback to original path
                    const tempData = data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
                    filterData = tempData.filter((items) => 'title' in items?.card?.card);
                }
                
                // Extract all dishes into a flat array (no duplicates)
                const dishesMap = new Map();
                
                function extractDishes(category) {
                    if (category?.itemCards) {
                        category.itemCards.forEach((item) => {
                            if (item?.card?.info) {
                                const dish = item.card.info;
                                if (!dishesMap.has(dish.id)) {
                                    dishesMap.set(dish.id, dish);
                                }
                            }
                        });
                    }
                    if (category?.categories) {
                        category.categories.forEach(subCat => extractDishes(subCat));
                    }
                }
                
                filterData.forEach(category => {
                    if (category?.card?.card) {
                        extractDishes(category.card.card);
                    }
                });
                
                // Convert Map values to array
                const uniqueDishes = Array.from(dishesMap.values());
                
                setAllDishes(uniqueDishes);
                setFilteredDishes(uniqueDishes);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch menu:", error);
                setLoading(false);
            }
        }
        
        fetchData();
    }, [id]);

    // Filter dishes based ONLY on search term matching dish name
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredDishes(allDishes);
            return;
        }
        
        const searchLower = searchTerm.toLowerCase();
        const filtered = allDishes.filter(dish => 
            dish.name?.toLowerCase().includes(searchLower)
        );
        
        setFilteredDishes(filtered);
    }, [searchTerm, allDishes]);

    return (
        <div className="w-[65%] mx-auto mt-20">
            {/* Search Input */}
            <div className="relative">
                <input 
                    className="w-full pl-4 pr-12 py-3 text-xl bg-gray-100 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"  
                    placeholder="Search for dishes..." 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    autoFocus
                />
                
                {/* Magnifying Glass Icon on RIGHT side */}
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            
            {/* Results Count */}
            {searchTerm && (
                <div className="mt-3 text-sm text-gray-600">
                    Found {filteredDishes.length} results for "{searchTerm}"
                </div>
            )}
            
            {/* Search Results - No duplicates */}
            <div className="mt-6">
                {filteredDishes.length > 0 ? (
                    filteredDishes.map((dish) => (
                        <RestInfo key={dish.id} restData={dish} />
                    ))
                ) : (
                    searchTerm && (
                        <div className="text-center py-12 text-gray-500">
                            No dishes found matching "{searchTerm}"
                        </div>
                    )
                )}
            </div>
        </div>
    );
}