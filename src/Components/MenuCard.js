import { useState } from "react"
import RestInfo from "./RestInfo"

export default function MenuCard({menuItems}){

    const [isOpen, setIsOpen] = useState(true);
    
    if("categories" in menuItems){
        return(
            <div className="w-full">
                <p className="text-lg font-bold">{menuItems.title}</p> 
                <div>
                    {
                        menuItems?.categories?.map((items)=> <MenuCard key={items?.title} menuItems={items}></MenuCard>)
                    }
                </div>
            </div>
        )
    }

    const isTopPicks = menuItems?.title === "Top Picks";
   
    if(!isOpen){
        return(
            <div className="w-full">
                <div className="flex justify-between w-full">
                    <p className="text-2xl font-bold mb-4">{menuItems.title}</p>  
                    {!isTopPicks && (  
                        <button className="text-2xl font-bold mr-20" onClick={()=>setIsOpen(!isOpen)}>{'⌄'}</button>
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
                    <button className="text-2xl font-bold mr-20" onClick={()=>setIsOpen(!isOpen)}>{'^'}</button>
                )}
            </div>
            <div>
                {
                    menuItems?.itemCards?.map((items)=><RestInfo key={items?.card?.info?.id} restData = {items?.card?.info}></RestInfo>)
                }
            </div>
            <div className="h-5 bg-gray-200 mt-2 mb-2"></div>
        </div>
    )
}