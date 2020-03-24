import React from "react";

function Loader() {
    return (
        <div className="loading-container">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loader;
