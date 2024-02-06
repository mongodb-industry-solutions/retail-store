"use client";

import Banner from "@leafygreen-ui/banner";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";

const Disclaimer = () => {

    return (
        <div>
            <LeafyGreenProvider>
                <Banner>
                    
                Disclaimer: This is a simulated ecommerce store for demo purposes only
                </Banner>
            </LeafyGreenProvider>
        </div>
    );
};


export default Disclaimer;
