import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./assets/css/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching product details.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (loading) {
    return <p className="text-center text-lg mt-10">در حال بارگذاری...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {product && (
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            <div className="w-full lg:w-1/2">
              <img
                src={product.image}
                alt={product.title}
                className="h-96 w-full object-cover"
              />
            </div>


            <div className="w-full lg:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-lg text-gray-700 mb-6">{product.content}</p>

              <h3 className="text-2xl font-semibold text-blue-500 mb-4">
                {product.price.toLocaleString()} تومان
              </h3>

              <p className="text-lg mb-4">
                <strong>وضعیت: </strong>
                <span
                  className={`${
                    product.status ? "text-green-500" : "text-red-500"
                  } font-bold`}
                >
                  {product.status ? "موجود" : "ناموجود"}
                </span>
              </p>

              <p className="text-lg mb-4">
                <strong>سازنده: </strong>
                {product.producer.first_name} {product.producer.last_name} (
                  <Link 
                      to={`/producer/${product.producer.username}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                      <span className="font-semibold">
                          {product.producer.username}
                      </span>
                  </Link>)
              </p>

              <p className="text-lg mb-6">
                <strong>دسته‌بندی: </strong>
                {product.category.map((cat, index) => (
                <Link 
                to={`/category/${cat.slug}`} 
                key={cat.slug} 
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    {cat.title}
                    {index < product.category.length - 1 && "، "}
                </Link>
                ))}
              </p>

              <button 
                className="btn-buy mx-auto" 
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
      )}
        {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{zIndex:"100000"}}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
                className="absolute top-2 left-2 text-gray-600 hover:text-gray-900"
                onClick={() => setShow(false)} 
                style={{display:"inline-block"}}
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

export default ProductDetail;
