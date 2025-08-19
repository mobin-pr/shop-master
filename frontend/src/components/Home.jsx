
import Slideshow from './slideShow';
import ProductsList from './products';
import Content from './Content';
import ShowProduct from './ShowProducts';
import Ostan from './Ostan'
import "./assets/css/styles.css";


const Home = () => {
    return (
      <div>
        <Slideshow  />
        <ProductsList title="محصولات جدید" />
        <ShowProduct />
        <Ostan ostan="سازندگان و تولید کنندگان" />
        <Content />
      </div>
    )
  }

  export default Home;