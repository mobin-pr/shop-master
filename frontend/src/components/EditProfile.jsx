import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";

const EditUserInfo = () => {
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    address: "",
    bio: "",
    profile_picture: null,
  });
  const [lastUserData, setLastUserData] = useState(null); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        });
        const userData = response.data[0]; 
  
        setLastUserData(userData);
  

        setFormData({
          username: userData.username || "",
          email: userData.email || "",
          phone_number: userData.phone_number || "",
          address: userData.address || "",
          bio: userData.bio || "",
          profile_picture: null, 
        });
  
        console.log(userData); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFormData({ ...formData, profile_picture: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "profile_picture") {
        if (formData[key]) data.append(key, formData[key]);
      } else {
        data.append(key, formData[key] || lastUserData?.[key] || "");
      }
    });

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/user/update-info/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        }
      );
      setMessage("اطلاعات با موفقیت به‌روزرسانی شد.");
      console.log(response);
    } catch (error) {
      setMessage("خطا در به‌روزرسانی اطلاعات.");
      console.error("Error updating user info:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto  rounded-xl p-8 mt-10 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">ویرایش اطلاعات کاربری</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="text-base block text-sm font-medium text-gray-700 mb-2">
            نام کاربری
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-base block text-sm font-medium text-gray-700 mb-2">
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
          />
        </div>

        <div>
          <label htmlFor="phone_number" className="text-base block text-sm font-medium text-gray-700 mb-2">
            شماره تلفن
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
          />
        </div>

        <div>
          <label htmlFor="address" className="text-base block text-sm font-medium text-gray-700 mb-2">
            آدرس
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
          />
        </div>

        <div>
          <label htmlFor="bio" className="text-base block text-sm font-medium text-gray-700 mb-2">
            بیوگرافی
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
          />
        </div>

        <div>
          <div className="relative">
            <input
              type="file"
              id="profile_picture"
              name="profile_picture"
              onChange={handleFileChange}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
            <button
              type="button"
              className="py-2 px-4 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200 ease-in-out flex items-center space-x-2"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7l10 10m0-10L7 17" />
              </svg>
              <span className="text-base">انتخاب عکس پروفایل</span>
            </button>
            {fileName && <p className="mt-2 text-sm text-gray-500">{fileName}</p>}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className=" w-2/3 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200 ease-in-out"
          >
            به‌روزرسانی
          </button>
        </div>
      </form>
      {message && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 left-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMessage("")}
              >
                <i className="fas fa-times fa-lg mt-3 ml-2"></i>
              </button>
              <h2 className="text-lg font-semibold mb-4">{message}</h2>

            </div>
          </div>
        )}
    </div>
  );
};

export default EditUserInfo;
