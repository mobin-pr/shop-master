import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./assets/css/card.css";
import "./assets/css/styles.css"
const Producers = () => {
  const [producers, setProducers] = useState([]);

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/producers/");
        setProducers(response.data);
      } catch (error) {
        console.error("Error fetching producers:", error);
      }
    };
    fetchProducers();
  }, []);

  return (
    <div className="p-6 products-container">
      <h2 className="text-3xl font-bold text-center mb-12 text-blue-600 products-title">لیست سازندگان</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {producers.map((producer) => (
          <div
            className="bg-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
            key={producer.username}
          >
            <div className="flex flex-col items-center">

              <img
                src={producer.profile_picture}
                alt={`${producer.username} profile`}
                className="w-28 h-28 rounded-full object-cover mb-6 border-4 border-blue-500"
              />
              <h3 className="text-2xl font-semibold text-center text-gray-800">{producer.username}</h3>
              <div className="mt-2 text-center text-gray-600">
                {producer.first_name && producer.last_name ? (
                  <p className="text-lg">{producer.first_name} {producer.last_name}</p>
                ) : (
                  <p className="text-lg text-gray-500">نام کامل در دسترس نیست</p>
                )}
              </div>
              <Link
                to={`/producer/${producer.username}`}
                className="btn-more"
                style={{ paddingLeft: "8px", paddingRight: "8px" }}
              >
                مشاهده محصولات
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Producers;
