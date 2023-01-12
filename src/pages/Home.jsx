import React from "react";

import "./pages.css";

import FirstAdBlock from "../components/Ads/FirstAdBlock";
import SecondAdBlock from "../components/Ads/SecondAdBlock";

import CardsHomePage from "../components/CardsHomePage/CardsHomePage";
import AdBlock from "../components/Ads/AdBlock";

export default ({data}) => {
    return (
        <div className="home">
            <FirstAdBlock />
            <SecondAdBlock />
            <CardsHomePage data={data} />
            <AdBlock />
        </div>
    )
}