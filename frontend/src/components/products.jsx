import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";  
import { Pagination, Navigation } from "swiper/modules";
import "./assets/css/styles.css";

function ProductsList({ title }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const lastFourProducts = products.slice(0, 8);
    const [show, setShow] = useState(false);

    const handleAddToCart = async (product) => {
        const accessToken = Cookies.get("access");
      
        try {
          // 1. Get all cart items
          const cartResponse = await axios.get("http://localhost:8000/api/cart-items/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
      
          const cartItems = cartResponse.data;
      
          // 2. Check if the product already exists in the cart
          const existingItem = cartItems.find(item => item.product === product.id);
      
          if (existingItem) {
            // 3. Update the quantity with PATCH
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
            <h2 className="products-title">{title}</h2>



            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                    300: { slidesPerView: 2 },
                    420: { slidesPerView: 2 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                pagination={{ clickable: true }}
                navigation= {true}
                modules={[Pagination, Navigation]} 
            >
                {lastFourProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="card">
                            <div className="card-container">
                                <div className="card-img-box">
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="card-link"
                                        style={{ display: 'block', position: 'absolute', inset: 0, zIndex: 1 }}
                                    />
                                    <img
                                        src={product.image || '/path/to/default-image.jpg'}
                                        alt={product.title || 'محصول'}
                                    />
                                </div>

                                <div className="card-text-box">
                                    <h3>{product.title}</h3>
                                    <h4 className="card-price">
                                        {product.price.toLocaleString()} تومان
                                    </h4>

                                    {product.category?.length > 0 && (
                                        <p className="product-category text-sm text-gray-600 mt-2">
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
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="text-center mt-8">
                <Link to="/products" className="btn-more">بیشتر</Link>
            </div>

            {show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{ zIndex: "100000" }}>
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
}

export default ProductsList;
