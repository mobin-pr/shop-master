import  { useState, useEffect } from "react";
import "./assets/css/slideshow.css"; 

import img1 from "./assets/images/b1.jpg";
import img2 from "./assets/images/b2.jpg";
import img3 from "./assets/images/b3.jpg";


const Slideshow = () => {
  const slides = [
    { src: img1, caption: "تنگ سلجوقی نقره و فیروزه " },
    { src: img2, caption: "اسلاید 2" },
    { src: img3, caption: "اسلاید 3" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000); 
    return () => clearInterval(interval);
  });

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide object-cover ${index === currentSlide ? "active" : ""}`}
        >
          <img src={slide.src} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      <button className="next" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="prev" onClick={nextSlide}>
        &#10095;
      </button>
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
