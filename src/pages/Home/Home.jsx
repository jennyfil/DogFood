import React from "react";

import FirstAdBlock from "../../components/Ads/FirstAdBlock";
import SecondAdBlock from "../../components/Ads/SecondAdBlock";
import CardsHomePage from "../../components/CardsHomePage/CardsHomePage";
import ThirdBlock from "../../components/Ads/ThirdBlock";

import "./home.css";

export default ({ data }) => {
    return (
        <div className="home">
            <FirstAdBlock />
            <SecondAdBlock />
            <CardsHomePage data={data} />
            <ThirdBlock />
        </div>
    )
}