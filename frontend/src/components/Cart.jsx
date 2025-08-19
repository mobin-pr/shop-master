import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = Cookies.get("access");
        const response = await axios.get("http://localhost:8000/api/cart-items/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data)
        fetchProductDetails(response.data)

      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
  
    fetchCartItems();
  }, []);
  
  
  const fetchProductDetails = async (items) => {
    const productData = {};
    for (const item of items) {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${item.product}/`);
        productData[item.product] = res.data;
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
    setProductDetails(productData);
  };
  

  const handleQuantityChange = async (itemId, action) => {
    const item = cartItems.find(i => i.id === itemId);
    const newQuantity = Math.max(1, item.quantity + (action === "increase" ? 1 : -1));
  
    try {
      const token = Cookies.get("access");
      await axios.patch(`http://localhost:8000/api/cart-items/${itemId}/`, {
        quantity: newQuantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setCartItems(prev =>
        prev.map(i => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  

  const handleRemoveItem = async (itemId) => {
    try {
      const token = Cookies.get("access");
      await axios.delete(`http://localhost:8000/api/cart-items/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setCartItems(prev => prev.filter(i => i.id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  



  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (productDetails[item.product]?.price || 0) * item.quantity,
      0
    );
  };
  

  return (
<div className="max-w-6xl mx-auto mt-12 p-6 bg-white rounded-2xl border border-gray-100">
  <div className="flex items-center gap-3 mb-8 text-gray-800">
    <h2 className="text-2xl font-bold">سبد خرید </h2>
  </div>

  {cartItems.length === 0 ? (
    <div className="text-center text-red-800 bg-red-300 rounded-lg border border-red-800 text-lg py-6">
      محصولی در سبد خرید نیست
    </div>
  ) : (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {cartItems.map((item) => {
        const product = productDetails[item.product];
        if (!product) return null;

        return (
          <div
            key={item.id}
            className="bg-gray-50 border rounded-xl shadow hover:shadow-md transition duration-300 flex flex-col"
          >
            {/* عکس */}
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-xl"
            />

            {/* اطلاعات کالا */}
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
              </div>

              {/* کنترل تعداد */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => handleQuantityChange(item.id, "increase")}
                  className="w-9 h-9 flex items-center justify-center rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition"
                >
                  <i className="fas fa-plus"></i>
                </button>

                <span className="w-10 text-center text-lg font-semibold text-gray-700">
                  {item.quantity}
                </span>

                <button
                  onClick={() => handleQuantityChange(item.id, "decrease")}
                  className="w-9 h-9 flex items-center justify-center rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
                >
                  <i className="fas fa-minus"></i>
                </button>
              </div>


              {/* حذف و مجموع */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 font-bold text-sm">
                  {(product.price * item.quantity).toLocaleString()} تومان
                </span>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  title="حذف محصول"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )}

  {/* مجموع کل */}
  {cartItems.length > 0 && (
    <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <h3 className="text-xl font-bold text-gray-800">
        جمع کل:{" "}
        <span className="text-green-600">
          {calculateTotal().toLocaleString()} تومان
        </span>
      </h3>
      <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition text-base">
        ادامه خرید
      </button>
    </div>
  )}
</div>


  );
};

export default Cart;
