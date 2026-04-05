export default function RestInfo({restData}){

    const rating = restData?.ratings?.aggregatedRating?.rating;
    const ratingCount = restData?.ratings?.aggregatedRating?.ratingCountV2;
    const hasRating = rating && rating !== "0" && rating !== 0;
    
    // Determine if item is Veg or Non-Veg
    const isVeg = restData?.isVeg === 1; // Veg items have isVeg: 1
    const isNonVeg = restData?.isVeg === undefined || restData?.isVeg === 0; 

    return (
         <>
        <div className="flex w-full justify-between mb-2 pb-2">
          <div className="w-[70%]">
            <div className="flex items-center gap-2 mb-1">
              {/* Veg/Non-Veg Indicator */}
              {isVeg ? (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <circle cx="10" cy="10" r="8" fill="#4CAF50" />
                    <circle cx="10" cy="10" r="3" fill="white" />
                  </svg>
                  <span className="text-xs text-green-700 font-medium">Veg</span>
                </div>
              ) : isNonVeg && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <rect x="4" y="4" width="12" height="12" rx="2" fill="#DC3545" />
                  </svg>
                  <span className="text-xs text-red-600 font-medium">Non-Veg</span>
                </div>
              )}
              <p className="text-xl text-gray-700 font-semibold">{restData?.name}</p>
            </div>
            <p className="text-lg">{"₹"+ ("defaultPrice" in restData ? restData?.defaultPrice/100:restData?.price/100)}</p>
            
            {hasRating ? (
                <div className="flex items-center gap-1">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="#3CB371" 
                        stroke="#3CB371" 
                        strokeWidth="1" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-green-700 text-sm font-medium">{rating}</span>
                    <span className="text-sm text-gray-500">({ratingCount})</span>
                </div>
            ) : (
                <div className="h-5"></div> 
            )}
            
            {restData?.description && (
                <p className="text-sm text-gray-500 mt-1">
                    {restData?.description}
                </p>
            )}    
          </div>
          <div className="w-[20%] relative">
            
            <img 
                className="w-full h-36 object-cover rounded-3xl" 
                src={"https://media-assets.swiggy.com/swiggy/image/upload/"+restData?.imageId} 
                alt={restData?.name}
            />
            <button className="absolute font-bold bottom-1 left-19 rounded-xl text-lg text-green-600 px-7 py-1 shadow-md border border-white bg-white hover:bg-green-50 transition">
                ADD
            </button>
          </div>
        </div>
        <hr className="mb-6 mt-2"></hr>
        </>
    )
}