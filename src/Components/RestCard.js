import { Link } from "react-router";

export default function RestCard({restInfo}){
   
    
    return (

        <Link to={"/city/delhi"+restInfo?.info?.id}>
            <div className="w-70 shrink-0 mb-2 transform transition duration-500 hover:scale-95">
                <img className="w-70 h-45 object-cover rounded-xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+restInfo.info.cloudinaryImageId}></img>
                <div className="w-[95%] mx-auto ">
                    <div className="font-bold text-xl truncate">{restInfo?.info?.name}</div>
                    <div className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3CB371" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                            <circle cx="12" cy="9" r="2.5"/>
                            
                            <line x1="16.5" y1="18" x2="21" y2="18"/>
                            <line x1="16.5" y1="20.5" x2="21" y2="20.5"/>
                            <line x1="16.5" y1="15.5" x2="21" y2="15.5"/>
                        </svg>
                        <span className="text-lg">{restInfo?.info?.avgRating}</span>
                        <span className="text-lg font-semibold">{restInfo?.info?.sla?.slaString}</span>
                    </div>
                    <div className="text-gray-600 font-semibold text-base truncate">{restInfo?.info?.cuisines.join(" ")}</div>
                </div>
            </div>
        </Link>
    ) 
}