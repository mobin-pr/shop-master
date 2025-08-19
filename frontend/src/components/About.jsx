
import "./assets/css/about.css";
import img1 from "./assets/images/show-img1.jpg";

const About = () => {
  return (
    <div className="min-h-screen  text-gray-800">
      <div className="container mx-auto py-16 px-6 lg:px-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-purple-700 tracking-tight drop-shadow-md">
            درباره ما
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto leading-relaxed">
            ارائه بهترین خدمات و محصولات با کیفیت و پشتیبانی بی‌نظیر.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
            <img
              src={img1}
              alt="تصویر درباره ما"
              className="rounded-3xl border-8 border-purple-200 "
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <p className="bg-white p-6 rounded-3xl leading-relaxed text-justify border-l-8 border-purple-500">
              فروشگاه ما با هدف ارائه محصولات با کیفیت و تجربه‌ای فوق‌العاده برای مشتریان ایجاد شده است. 
              تیم ما از متخصصان حرفه‌ای تشکیل شده که همواره در تلاش هستند تا تجربه خریدی راحت، سریع و امن را برای شما فراهم کنند.
            </p>
            <p className="bg-white p-6 rounded-3xl leading-relaxed text-justify border-l-8 border-pink-500">
              هدف ما نه تنها ارائه محصولات با کیفیت، بلکه ساختن ارتباطی دوستانه و پایدار با مشتریان عزیز است. 
              به ما اعتماد کنید و از تجربه خرید لذت ببرید.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
