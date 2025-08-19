
import "./assets/css/cart.css"
const ProductCheckout = () => {
  const address = "ناکجاآباد";
  const totalAmount = 150000; 
  const products = [
    { id: 1, name: "محصول 1", price: 50000 },
    { id: 2, name: "محصول 2", price: 70000 },
    { id: 3, name: "محصول 3", price: 30000 },
  ];

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">صفحه ارسال محصول</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">آدرس:</h2>
        <p className="text-gray-600">{address}</p>
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">محصولات:</h2>
        <ul className="divide-y divide-gray-300">
          {products.map(product => (
            <li key={product.id} className="flex justify-between items-center mb-2 p-4 bg-gray-50 rounded-lg shadow-md transition-all duration-300 hover:bg-indigo-100 hover:shadow-lg">
              <span className="font-medium text-gray-800">{product.name}</span>
              <span className="text-gray-700 font-semibold">{product.price} تومان</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-summary">
            <div className="font-bold total-amount ">
                <h2 className="text-lg text-gray-800">مجموع پرداختی:</h2>
                <span className="text-xl text-indigo-600 text-blue-300 ">{totalAmount} تومان</span>
            </div>
            <button className="btn-checkout mt-4 hover:bg-green-500">تسویه حساب</button>
        </div>
    </div>
  );
};

export default ProductCheckout;
