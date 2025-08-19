import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import "./assets/css/card.css"; 
import "./assets/css/styles.css";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await axios.get("http://127.0.0.1:8000/api/products/");
              setProducts(response.data);
          } catch (error) {
              console.error("Error fetching products:", error);
          }
      };
      fetchProducts();
  }, []);

  const initialVisibleCount = 6; 
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, products.length));
  };

  const handleShowLess = () => {
    setVisibleCount(initialVisibleCount); 
  };


  const [show,setShow] = useState(false)

  const handleAddToCart = async (product) => {
    const accessToken = Cookies.get("access");
  
    try {
      const cartResponse = await axios.get("http://localhost:8000/api/cart-items/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const cartItems = cartResponse.data;
  
      const existingItem = cartItems.find(item => item.product === product.id);
  
      if (existingItem) {
        const updatedItem = {
          quantity: existingItem.quantity + 1,
        };
  
        const updateResponse = await axios.patch(
          `http://localhost:8000/api/cart-items/${existingItem.id}/`,
          updatedItem,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        console.log("Item quantity updated:", updateResponse.data);
      } else {
        const cartItem = {
          product: product.id,
          quantity: 1,
          price_per_item: product.price,
        };
  
        const addResponse = await axios.post(
          "http://localhost:8000/api/cart-items/",
          cartItem,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        console.log("Item added to cart:", addResponse.data);
      }
  
      setShow(true);
    } catch (err) {
      console.error("Error handling cart:", err.response?.data || err.message);
    }
  };
  

  return (
    <div className="products-container">
      <h2 className="products-title">لیست محصولات</h2>
      <div className="products-grid">
        {products.slice(0, visibleCount).map((product) => (
          <div className="card" key={product.id}>
            <div className="card-container">
              <div className="card-img-box">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.title} />
                </Link>
              </div>
              <div className="card-text-box">
                <h3>{product.title}</h3>
                <h4 className="card-price">{product.price.toLocaleString()} تومان</h4> 
                
                <div className="card-text-box">
                <span
                  className={`absolute top-1 right-0 px-2 py-1 text-sm font-semibold rounded-full
                    ${product.status
                      ? 'bg-green-200 text-green-700'
                      : 'bg-red-100 text-red-700'}`}
                  style={{ width: 'fit-content', marginRight: '8px' }}
                >
                  {product.status ? 'موجود' : 'ناموجود'}
                </span>
                  <p className="text-sm text-gray-600 mr-4">
                      سازنده:
                          
                  <Link 
                  to={`/producer/${product.producer.username}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                        <span className="font-semibold">
                          {product.producer.username}</span>
                  </Link>
                  </p>
                </div>

                <button className="btn-buy" onClick={() => handleAddToCart(product)}>
                    <span className="new">
                        <i className="fa-solid fa-cart-shopping text-xl"></i>
                    </span>
                    <span className="old">افزودن به سبد خرید</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {visibleCount < products.length && (
          <button
            className="btn-more hover:bg-blue-500"
            onClick={handleLoadMore}
          >
            بیشتر
          </button>
        )}
        {visibleCount > initialVisibleCount && (
          <button
            className="btn-less hover:bg-red-600"
            onClick={handleShowLess}
          >
            کمتر
          </button>
        )}
      </div>
      {show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 left-2 text-gray-600 hover:text-gray-900"
                onClick={() => setShow(false)} 
              >
                <i className="fas fa-times fa-lg mt-3 ml-2"></i>
              </button>
              <h2 className="text-lg font-semibold mb-4">محصول به سبد خرید اضافه شد</h2>
            </div>
          </div>
        )}

    </div>

  );
};

export default AllProduct;
