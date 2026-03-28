import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import FoodOption from "./Components/FoodOption"
import GroceryOption from "./Components/GroceryOption";


function App(){
    return(
        <>
            <Header></Header>
            <FoodOption></FoodOption>
            <GroceryOption></GroceryOption>
        </>
    )

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
