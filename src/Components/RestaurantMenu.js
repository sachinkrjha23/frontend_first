import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MenuCard from "./MenuCard";
import MenuShimmer from "./MenuShimmer";


export default function RestaurantMenu(){
   
    let {id} = useParams();
    console.log(id);

    const [RestData, setRestData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
    
        async function fetchData() {

            try{
                const proxyServer = "https://cors-anywhere.herokuapp.com/"
                const swiggyAPI = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${id}`;
                const response = await fetch(proxyServer+swiggyAPI);
                const data = await response.json();
                const tempData = data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
                const filterData = tempData.filter((items)=> 'title' in items?.card?.card)
                setRestData(filterData);
                setLoading(false); 
            }
            catch (error) {
               console.error("Failed to fetch menu:", error);
               setLoading(false);  
           }   
           
        }  
        fetchData();
       },[])


       console.log(RestData);

       if(loading) {
        return <MenuShimmer />;
       }

    return(
        <div className="w-[80%] mx-auto mt-20">
          {
            RestData.map((menuItems)=><MenuCard key={menuItems?.card?.card?.title} menuItems={menuItems?.card?.card}></MenuCard>)
          }
        </div>
    )

}