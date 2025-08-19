import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(""); 

    try {
      const response = await axios.post("http://localhost:8000/api/contact/", formData);
      setResponseMessage(response.data.message); 
      console.log(formData)
      setIsSubmitting(false); 
    } catch {
      setResponseMessage("خطایی در ارسال پیام رخ داده است.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-800">
      <div className="container mx-auto py-16 px-6 lg:px-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-purple-700 tracking-tight drop-shadow-md">
            ارتباط با ما
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto leading-relaxed">
            سوالی دارید؟ از طریق فرم زیر با ما در ارتباط باشید یا از راه‌های دیگر پیام بدهید.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <form
            className="p-8 rounded-3xl space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-gray-700 font-bold mb-2">نام شما</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="نام خود را وارد کنید"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">ایمیل</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ایمیل خود را وارد کنید"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">پیام</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="پیام خود را بنویسید"
                rows="4"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-purple-700 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
            </button>
          </form>

          {responseMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 left-2 text-gray-600 hover:text-gray-900"
                onClick={() => setResponseMessage("")}
              >
                <i className="fas fa-times fa-lg mt-3 ml-2"></i>
              </button>
              <h2 className="text-lg font-semibold mb-4">{responseMessage}</h2>

            </div>
          </div>
        )}

          {/* اطلاعات تماس */}
          <div className="space-y-8 text-right">
            <div className="flex items-center gap-4">
              <i className="fas fa-phone-alt text-purple-500 text-3xl"></i>
              <div>
                <h3 className="text-lg font-bold">شماره تماس</h3>
                <p className="text-gray-600" dir="ltr">+98 912 123 4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <i className="fas fa-envelope text-purple-500 text-3xl"></i>
              <div>
                <h3 className="text-lg font-bold">ایمیل</h3>
                <p className="text-gray-600">info@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <i className="fas fa-map-marker-alt text-purple-500 text-3xl"></i>
              <div>
                <h3 className="text-lg font-bold">آدرس</h3>
                <p className="text-gray-600">ایران</p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-start space-x-4 space-x-reverse">
              <a
                href="/"
                className="text-purple-500 text-3xl hover:text-purple-700 transition-all duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="/"
                className="text-purple-500 text-3xl hover:text-purple-700 transition-all duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="/"
                className="text-purple-500 text-3xl hover:text-purple-700 transition-all duration-300"
              >
                <i className="fab fa-telegram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
