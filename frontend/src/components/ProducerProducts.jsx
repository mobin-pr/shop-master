import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom"; 
import "./assets/css/card.css";
import "./assets/css/styles.css";

const ProducerProducts = () => {
  const { username } = useParams(); 
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/?producer__username=${username}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [username]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, products.length));
  };

  const handleShowLess = () => {
    setVisibleCount(6);
  };

  const [show,setShow] = useState(false)

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.title,
        producer: product.producer.username,
        quantity: 1, 
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    setShow(true)
  };

  return (
    <div className="products-container">
      <h2 className="products-title">محصولات {username}</h2>
      <div className="products-grid">
        {products.slice(0, visibleCount).map((product) => (
          <div className="card" key={product.id}>
          <div className="card-container">
              <div className="card-img-box">
                  <img src={product.image} alt={product.title} />
              </div>
              <div className="card-text-box">
                  <h3>{product.title}</h3>
                  {product.category?.length > 0 && (
              <p className="product-category text-sm text-gray-600 mt-2">
                  <h4 className="card-price">{product.price.toLocaleString()} تومان</h4>
                  دسته‌بندی: 
                  {product.category.map((cat, index) => (
                      <Link 
                          to={`/category/${cat.slug}`} 
                          key={cat.slug} 
                          className="font-medium text-bold text-blue-600 dark:text-blue-500 hover:underline"
                      >
                          {cat.title}
                          {index < product.category.length - 1 && "، "}
                      </Link>
                  ))}
              </p>
          )}
          <div className="flex items-center" style={{display:"block"}}>
              <div className="flex items-center mt-2">
                  <span 
                      className={`block px-2 py-1 text-xs font-semibold rounded-full 
                      ${product.status ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                      style={{ width: 'fit-content', marginRight: '8px' }} 
                  >
                      {product.status ? 'موجود' : 'ناموجود'}
                  </span>

                  {product.producer?.username && (
                      <p className="text-sm text-gray-600 mr-4">
                          سازنده:
                          <Link 
                              to={`/producer/${product.producer.username}`}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                              <span className="font-semibold">
                                  {product.producer.username}
                              </span>
                          </Link>
                      </p>
                  )}
              </div>

          </div>
          <button 
              className="btn-buy" 
              onClick={() => handleAddToCart(product)}
          >
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
      <div className="flex justify-center mt-6">
        {visibleCount < products.length && (
          <button
            className="btn-more hover:bg-blue-500"
            onClick={handleLoadMore}
          >
            بیشتر
          </button>
        )}
        {visibleCount > 6 && (
          <button
            className="btn-less hover:bg-red-600"
            onClick={handleShowLess}
          >
            کمتر
          </button>
        )}
      </div>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{zIndex:"100000"}}>
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

export default ProducerProducts;
