import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Home from "./Components/Home";
import Restaurant from "./Components/Restaurant";
import {BrowserRouter, Route, Routes} from "react-router";
import RestaurantMenu from "./Components/RestaurantMenu";
import SearchFood from "./Components/SearchFood";
import SecondaryHome from "./Components/SecondaryHome";


function App(){
    
    return(
       <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route element={<SecondaryHome></SecondaryHome>}>
                    <Route path="/restaurant" element={<Restaurant></Restaurant>}></Route>
                    <Route path="/city/delhi/:id" element={<RestaurantMenu></RestaurantMenu>}></Route>
                    <Route path="/city/delhi/:id/search" element={<SearchFood></SearchFood>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>

       </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App></App>);



// Proxy server "https://cors-anywhere.herokuapp.com/"; 


