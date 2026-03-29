import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import FoodOption from "./Components/FoodOption"
import GroceryOption from "./Components/GroceryOption";
import DineOption from "./Components/DineOption";
import DineCard from "./Components/DineCard";
import Restaurant from "./Components/Restaurant";


function App(){
    return(
        <>
            <Header></Header>
            <FoodOption></FoodOption>
            <GroceryOption></GroceryOption>
            <DineOption></DineOption>
            <DineCard></DineCard>
            <Restaurant></Restaurant>
        </>
    )

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
