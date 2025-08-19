import { useState,useEffect } from "react";
import axios from 'axios';
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import moment from 'moment-jalaali';
import "./assets/css/profile.css";

const UserProfile = () => {
  const [user, setUser] = useState({});



  const [show,setShow] = useState(false);

  const navigate = useNavigate();


  const handleEditClick = () => {
    navigate("/edit")
  };

  const handleLogout = async () => {
    try {
        await axios.post('http://localhost:8000/api/auth/logout/', {}, {
            body: {
                Content: `${Cookies.get('access')}` 
            }
        });

        Cookies.remove('access'); 

        Cookies.remove('refresh'); 
        setShow(true); 
        setTimeout(() => {
            setShow(false); 
            navigate('/login');
        }, 2000);

    } catch (err) {
        console.error("خطایی در هنگام لاگ اوت رخ داد:", err);
    }};


    const verifyToken = async () => {
      const accessToken = Cookies.get("access");
      if (!accessToken) {
          navigate("/login");
          return;
      }
      try {
          await axios.post('http://localhost:8000/api/auth/token/verify/', {
              token: accessToken 
          });
      } catch (err) {
          if (err.response && err.response.status === 401) {
              await refreshToken();
          } else {
              console.error("Error verifying token:", err);
              navigate("/login");
          }
      }
  };

  const refreshToken = async () => {
      const refreshToken = Cookies.get("refresh");
      if (!refreshToken) {
          navigate("/login");
          return;
      }
      try {
          const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
              refresh: refreshToken 
          });
          const newAccessToken = response.data.access;
          Cookies.set("access", newAccessToken, { path: "/" });
      } catch (err) {
          console.error("Error refreshing token:", err);
          navigate("/login");
      }
  };


  const getUserInfo = async () => { 
    try {
      const response = await axios.get("http://localhost:8000/api/user/", {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}` 
        }
      });
      setUser(response.data[0])
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }
  


  const [date, setDate] = useState("");

  const getDateJoined = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/date-joined", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      });
      const gregorianDate = response.data.date_joined; 
      const jalaliDate = moment(gregorianDate).format("jYYYY/jMM/jDD"); 
      setDate(jalaliDate);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const ProfilePicture = () => {
    return user.profile_picture ? user.profile_picture : "https://via.placeholder.com/250"
  }

  useEffect(() => {
      verifyToken();
      getUserInfo();
      getDateJoined();
  }, []);


  return (
    <div className="bg-gradient-to-br from-brown-100 to-brown-200 text-black h-full flex flex-col items-center justify-start py-8 px-4">
      <div className="max-w-md w-full  p-6 transition duration-500">
        <div className="flex items-center space-x-4 p-4">
          <img
            src={
              ProfilePicture()
            }
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-md"
          />
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl font-bold text-black mr-4">{user.username}</h1>
            <p className="mt-4 mr-4 text-gray-600 text-sm text-justify">{user.bio}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <span className="w-10 h-10 flex justify-center items-center bg-blue-200 text-blue-800 rounded-full shadow-md ml-2">
              <i className="fas fa-envelope"></i>
            </span>
            <p className="ml-4 text-black">ایمیل: {user.email}</p>
          </div>
          <div className="flex items-center">
            <span className="w-10 h-10 flex justify-center items-center bg-blue-200 text-blue-800 rounded-full shadow-md ml-2">
              <i className="fas fa-phone"></i>
            </span>
            <p className="ml-4 text-black">تلفن: {user.phone_number}</p>

          </div>
          <div className="flex items-center">
            <span className="w-10 h-10 flex justify-center items-center bg-blue-200 text-blue-800 rounded-full shadow-md ml-2">
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <p className="ml-4 text-black">آدرس: {user.address}</p>

          </div>
          <div className="flex items-center">
            <span className="w-10 h-10 flex justify-center items-center bg-blue-200 text-blue-800 rounded-full shadow-md ml-2">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <p className="ml-4 text-black">تاریخ عضویت: {date}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handleEditClick}
            className="text-white px-4 py-2 rounded-lg hover:bg-blue-500 shadow-md transition duration-300 btn-edit"
          >
            <a href="/edit">  ویرایش
            </a>
          </button>
          <button className="text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md transition duration-300 btn-logout" onClick={handleLogout}>
            خروج
          </button>
        </div>
      </div>
      {show && (
          <div className="error-modal">
              <div className="error-modal-content">
                  <p>خروج با موفقیت انجام شد!</p>
                  <div className="timer"></div> 
              </div>
          </div>
      )}
    </div>
  );
};

export default UserProfile;
