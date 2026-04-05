import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MenuCard from "./MenuCard";
import MenuShimmer from "./MenuShimmer";

export default function RestaurantMenu(){
   
    let {id} = useParams();
    console.log(id);

    const [RestData, setRestData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState(null); // null, "VEG", "NONVEG"

    useEffect(() => {
        async function fetchData() {
            try {
                const proxyServer = "https://cors-anywhere.herokuapp.com/"
                const swiggyAPI = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${id}`;
                const response = await fetch(proxyServer + swiggyAPI);
                const data = await response.json();
                const tempData = data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
                const filterData = tempData.filter((items) => 'title' in items?.card?.card);
                setRestData(filterData);
                setFilteredData(filterData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch menu:", error);
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    // Apply filter whenever activeFilter changes
    useEffect(() => {
        if (!RestData.length) return;
        
        if (!activeFilter) {
            // No filter active - show all
            setFilteredData(RestData);
            return;
        }

        const filtered = RestData.map(category => {
            // Deep clone the category
            const newCategory = JSON.parse(JSON.stringify(category));
            
            // Filter itemCards if they exist
            if (newCategory?.card?.card?.itemCards) {
                newCategory.card.card.itemCards = newCategory.card.card.itemCards.filter(item => {
                    const isVeg = item?.card?.info?.isVeg === 1;
                    
                    if (activeFilter === "VEG") {
                        return isVeg === true;
                    } else if (activeFilter === "NONVEG") {
                        // Non-veg items either have isVeg === 0 or no isVeg key
                        return isVeg === false;
                    }
                    return true;
                });
            }
            
            // Filter categories if they exist
            if (newCategory?.card?.card?.categories) {
                newCategory.card.card.categories = newCategory.card.card.categories.map(subCat => {
                    const newSubCat = { ...subCat };
                    if (newSubCat?.itemCards) {
                        newSubCat.itemCards = newSubCat.itemCards.filter(item => {
                            const isVeg = item?.card?.info?.isVeg === 1;
                            
                            if (activeFilter === "VEG") {
                                return isVeg === true;
                            } else if (activeFilter === "NONVEG") {
                                return isVeg === false;
                            }
                            return true;
                        });
                    }
                    return newSubCat;
                }).filter(subCat => {
                    // Only keep subcategories that have items
                    return subCat?.itemCards && subCat.itemCards.length > 0;
                });
            }
            
            return newCategory;
        }).filter(category => {
            // Only keep categories that have items or subcategories with items
            const hasItems = category?.card?.card?.itemCards?.length > 0;
            const hasSubCategories = category?.card?.card?.categories?.length > 0;
            return hasItems || hasSubCategories;
        });
        
        console.log("Filtered categories:", filtered.length);
        setFilteredData(filtered);
    }, [activeFilter, RestData]);

    const handleVegClick = () => {
        console.log("Veg clicked, current filter:", activeFilter);
        // If Veg is already active, turn it off (show all)
        // Otherwise, activate Veg (and turn off Non-Veg automatically)
        setActiveFilter(activeFilter === "VEG" ? null : "VEG");
    };

    const handleNonVegClick = () => {
        console.log("Non-Veg clicked, current filter:", activeFilter);
        // If Non-Veg is already active, turn it off (show all)
        // Otherwise, activate Non-Veg (and turn off Veg automatically)
        setActiveFilter(activeFilter === "NONVEG" ? null : "NONVEG");
    };

    if (loading) {
        return <MenuShimmer />;
    }

    return (
        <div className="w-[80%] mx-auto mt-20">
            {/* Filter Buttons - Left aligned square buttons */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={handleVegClick}
                    className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                        activeFilter === "VEG" 
                            ? "bg-green-500 border-green-600 shadow-md" 
                            : "bg-white border-gray-300 hover:border-green-400"
                    }`}
                    title="Show vegetarian items only"
                >
                    <svg className={`w-6 h-6 ${activeFilter === "VEG" ? "text-white" : "text-green-600"}`} viewBox="0 0 20 20" fill="currentColor">
                        <circle cx="10" cy="10" r="8" />
                        <circle cx="10" cy="10" r="3" fill={activeFilter === "VEG" ? "#22c55e" : "white"} />
                    </svg>
                </button>
                
                <button
                    onClick={handleNonVegClick}
                    className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                        activeFilter === "NONVEG" 
                            ? "bg-red-500 border-red-600 shadow-md" 
                            : "bg-white border-gray-300 hover:border-red-400"
                    }`}
                    title="Show non-vegetarian items only"
                >
                    <svg className={`w-6 h-6 ${activeFilter === "NONVEG" ? "text-white" : "text-red-600"}`} viewBox="0 0 20 20" fill="currentColor">
                        <rect x="4" y="4" width="12" height="12" rx="2" />
                    </svg>
                </button>
            </div>
            
            {/* Active filter indicator */}
            {activeFilter === "VEG" && (
                <div className="mb-4 text-sm bg-green-50 p-2 rounded-lg flex items-center gap-2 text-green-700">
                    <span>🌱 Showing only vegetarian items</span>
                    <button 
                        onClick={handleVegClick}
                        className="ml-auto text-xs underline hover:no-underline"
                    >
                        Clear filter
                    </button>
                </div>
            )}
            
            {activeFilter === "NONVEG" && (
                <div className="mb-4 text-sm bg-red-50 p-2 rounded-lg flex items-center gap-2 text-red-700">
                    <span>🍖 Showing only non-vegetarian items</span>
                    <button 
                        onClick={handleNonVegClick}
                        className="ml-auto text-xs underline hover:no-underline"
                    >
                        Clear filter
                    </button>
                </div>
            )}
            
            {/* Menu items */}
            {filteredData.length > 0 ? (
                filteredData.map((menuItems) => (
                    <MenuCard 
                        key={menuItems?.card?.card?.title} 
                        menuItems={menuItems?.card?.card}
                        activeFilter={activeFilter}
                    />
                ))
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        {activeFilter === "VEG" 
                            ? "No vegetarian items found in the menu." 
                            : activeFilter === "NONVEG"
                            ? "No non-vegetarian items found in the menu."
                            : "No items found in the menu."}
                    </p>
                    {activeFilter && (
                        <button 
                            onClick={() => setActiveFilter(null)}
                            className="mt-4 text-blue-600 underline"
                        >
                            Show all items
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}