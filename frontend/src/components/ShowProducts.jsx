import React from "react";
import img1 from "./assets/images/show-img1.jpg";

import img2 from "./assets/images/show-img2.jpg";
import "./assets/css/showProduct.css";

const ShowProduct = () => {

    return(
        <React.Fragment>
            <div className="showProduct-container">
                <img src={img1} alt="show1" />
                <img src={img2} alt="show2" />
            </div>
        </React.Fragment>
    );
};
export default ShowProduct;

