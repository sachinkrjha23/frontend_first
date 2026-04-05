import { useState } from "react"
import RestInfo from "./RestInfo"

export default function MenuCard({menuItems, activeFilter = null}){

    const [isOpen, setIsOpen] = useState(true);
    
    // Handle nested categories (recursive)
    if("categories" in menuItems){
        // Filter out empty categories
        const filteredCategories = menuItems?.categories?.filter(cat => {
            if (activeFilter === "VEG") {
                return cat?.itemCards?.some(item => item?.card?.info?.isVeg === 1);
            } else if (activeFilter === "NONVEG") {
                return cat?.itemCards?.some(item => item?.card?.info?.isVeg !== 1);
            }
            return true;
        });
        
        if (filteredCategories.length === 0) {
            return null;
        }
        
        return(
            <div className="w-full">
                <p className="text-lg font-bold">{menuItems.title}</p> 
                <div>
                    {
                        filteredCategories.map((items) => (
                            <MenuCard 
                                key={items?.title} 
                                menuItems={items} 
                                activeFilter={activeFilter}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }

    // Filter items based on activeFilter
    let filteredItemCards = menuItems?.itemCards || [];
    
    if (activeFilter === "VEG") {
        filteredItemCards = filteredItemCards.filter(item => {
            return item?.card?.info?.isVeg === 1;
        });
    } else if (activeFilter === "NONVEG") {
        filteredItemCards = filteredItemCards.filter(item => {
            // Non-veg items don't have isVeg key or have isVeg: 0
            return item?.card?.info?.isVeg !== 1;
        });
    }

    // Don't render category if no items match the filter
    if (filteredItemCards.length === 0) {
        return null;
    }

    const isTopPicks = menuItems?.title === "Top Picks";
   
    if(!isOpen){
        return(
            <div className="w-full">
                <div className="flex justify-between w-full">
                    <p className="text-2xl font-bold mb-4">{menuItems.title}</p>  
                    {!isTopPicks && (  
                        <button className="text-2xl font-bold mr-20" onClick={() => setIsOpen(!isOpen)}>{'⌄'}</button>
                    )}
                </div>
                <div className="h-5 bg-gray-200 mt-2 mb-2"></div>
            </div>   
        ) 
    }
    

    return (
        <div className="w-full">
            <div className="flex justify-between w-full">
                <p className="text-2xl font-bold mb-4">{menuItems.title}</p> 
                {!isTopPicks && ( 
                    <button className="text-2xl font-bold mr-20" onClick={() => setIsOpen(!isOpen)}>{'^'}</button>
                )}
            </div>
            <div>
                {
                    filteredItemCards.map((items) => (
                        <RestInfo 
                            key={items?.card?.info?.id} 
                            restData={items?.card?.info}
                        />
                    ))
                }
            </div>
            <div className="h-5 bg-gray-200 mt-2 mb-2"></div>
        </div>
    )
}