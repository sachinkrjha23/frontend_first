export default function MenuShimmer() {
  return (
    <div className="w-[80%] mx-auto mt-20">
      {/* Header shimmer */}
      <div className="w-full mb-8">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>

      {/* Menu sections shimmer */}
      {Array(10).fill("").map((_, index) => (
        <div key={index} className="mb-6">
          {/* Section title shimmer */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-7 bg-gray-200 rounded animate-pulse w-1/4"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          {/* 3 food items shimmer */}
          {Array(10).fill("").map((_, itemIndex) => (
            <div key={itemIndex} className="flex justify-between mb-4 pb-4 border-b">
              <div className="w-[70%]">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
              <div className="w-[20%]">
                <div className="w-full h-28 bg-gray-200 rounded-2xl animate-pulse"></div>
              </div>
            </div>
          ))}
          
          {/* Divider shimmer */}
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full mt-2"></div>
        </div>
      ))}
    </div>
  );
}