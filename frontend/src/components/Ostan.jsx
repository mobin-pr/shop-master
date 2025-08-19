
import "./assets/css/ostan.css";
import "./assets/css/styles.css"
import { Link } from "react-router-dom";

const Ostan = (props) => {
  return(
    <div className="ostan-container rounded-lg">
      <div className="ostan-text-box">
        <h2 className="ostan-text-box-title">{props.ostan}</h2>
        <Link to="/producers" className="btn-more hover:text-red-300"><span>بیشتر</span></Link>
      </div>
    </div>
  );
};
export default Ostan;



