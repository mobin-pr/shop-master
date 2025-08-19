import axios from "axios";
import { useEffect, useState } from "react";
import "./assets/css/reset.css";

const PasswordResetConfirmation = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email,setEmail] = useState("")
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('email'));
    if (items) {
     setEmail(items);
    }
  }, []);
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/auth/password/reset/", {
        email: email , 
      });
      console.log("ایمیل دوباره ارسال شد:", response.data);
      setShow(true);
    } catch (error) {
      console.error("خطا در ارسال ایمیل:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-cover bg-center bg-no-repeat main">
      <div className="bg-transparent border-2 border-white/50 rounded-lg p-8 backdrop-blur-md w-full max-w-md flex flex-col items-center md:w-2/4 lg:h-80">
        <h1 className="text-2xl text-white text-center mb-4">ایمیل ارسال شد!</h1>
        <p className="text-white text-center mb-3 mt-4">
          ایمیلی حاوی لینک تغییر رمز عبور به آدرس شما ارسال شد. لطفاً صندوق ورودی خود
          را بررسی کنید. اگر ایمیلی دریافت نکردید، پوشه اسپم را چک کنید یا
          دوباره تلاش کنید.
        </p>
        <div className="grid grid-cols-2 gap-4 w-full">
          <button
            className="bg-white text-center border-2 border-white text-black rounded-xl py-1 text-md w-full transition duration-300 ease-in-out text-base hover:bg-transparent hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-50 md:py-2 md:mt-6 md:text-lg"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? "در حال ارسال..." : "ارسال دوباره ایمیل"}
          </button>
          <a
            href="/"
            className="bg-white text-center border-2 border-white text-black rounded-xl py-1 text-md w-full transition duration-300 ease-in-out text-base hover:bg-transparent hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-50 md:py-2 md:mt-6 md:text-lg"
          >
            بازگشت به صفحه اصلی
          </a>
        </div>
      </div>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 left-2 text-gray-600 hover:text-gray-900"
              onClick={handleClose}
            >
              <i className="fas fa-times fa-lg mt-3 ml-2"></i>
            </button>
            <h2 className="text-lg font-semibold mb-4">ایمیل دوباره ارسال شد</h2>
            <p className="mb-4">
              ایمیلی حاوی لینک تغییر رمز عبور دوباره به آدرس شما ارسال شد. لطفاً صندوق ورودی خود
              را بررسی کنید. اگر ایمیلی دریافت نکردید، پوشه اسپم را چک کنید یا
              دوباره تلاش کنید.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordResetConfirmation;
