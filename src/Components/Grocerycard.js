export default function Grocerycard({foodData})
{
    return(
        <div className="flex-none">
            <a href="#" onClick={(e) => {
                e.preventDefault();
                alert("🛒 Instamart grocery - Coming soon!");
            }}>
                <img className="w-40 h-50 object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+foodData?.imageId} alt={foodData?.action?.text} />
            </a>
            <h1 className="text-center font-bold">{foodData?.action?.text}</h1>
        </div>
    )
}