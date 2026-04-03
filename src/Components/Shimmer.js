export default function Shimmer() {
  return (
    <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5">
      {Array(20).fill("").map((_, index) => (
        <div key={index} className="w-70 shrink-0 mb-2">
          <div className="w-70 h-45 rounded-xl bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[:200%_100%] animate-shimmer"></div>
          
          <div className="w-[95%] mx-auto mt-2">
            <div className="h-7 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[:200%_100%] animate-shimmer rounded mb-2"></div>
            
            <div className="flex gap-2 items-center mb-2">
              <div className="w-5 h-5 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[:200%_100%] animate-shimmer rounded-full"></div>
              <div className="w-10 h-5 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[:200%_100%] animate-shimmer rounded"></div>
              <div className="w-16 h-5 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[:200%_100%] animate-shimmer rounded"></div>
            </div>
            
            <div className="h-5 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[:200%_100%] animate-shimmer rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
} 