
export default function DineCard({RestData}){
    return(
        <div className="max-w-md flex-none">
            <a target="_blank" rel="noopener noreferrer" href={RestData?.cta?.link}>
                <div className="relative">
                    <img className="w-80 h-48 object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/" + RestData?.info?.mediaFiles?.[0]?.url}
                        alt={RestData?.info?.name}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                        }}
                    />
                    <p className="absolute bottom-2 left-2 text-lg font-semibold text-white bg-black/50 px-2 rounded">{RestData?.info?.name}</p>
                    <p className="absolute bottom-2 right-2 bg-white text-black text-sm px-2 py-1 rounded">{RestData?.info?.rating?.value}</p>
                </div>
            </a>
        </div>
    )
}