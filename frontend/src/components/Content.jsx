import { useState } from 'react';
import img1 from "./assets/images/5.jpg";
import "./assets/css/info.css";

const Content = () => {
  const [showAll, setShowAll] = useState(false);
  const HandleClick = () => {
    setShowAll((prevState) => !prevState);
  }

  return (
    <div className="flex flex-col mb-12 w-85% md:flex-row items-center rounded-lg p-6 space-y-6 md:space-y-0 md:space-x-6 md:space-x-reverse sm:mx-24">
      <div className="flex-1 text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">عنوان توضیحات</h2>
        <p className="mb-2 leading-relaxed">
          این اولین بند توضیحات است. در اینجا می‌توانید اطلاعاتی را درباره موضوع مورد نظر بنویسید.
        </p>
        <p className="mb-2 leading-relaxed">
          این دومین بند توضیحات است. در این بخش اطلاعات تکمیلی نمایش داده می‌شود.
        </p>
        <p className="leading-relaxed">
          این سومین بند توضیحات است که می‌تواند شامل موارد مهم باشد.
        </p>

        <div 
          className={`mt-2 transition-all duration-500 ease-in-out ${showAll ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}
        >
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
        </div>
      </div>

      <div className="grid grid-cols-5 items-center">
        <img
          src={img1}
          alt="تصویر توضیحات"
          className="w-48 h-32 rounded-full col-span-2 shadow-md object-cover mb-4 sm:mb-0 mr-0 md:w-48 md:h-48"
        />
        <div className="mr-16 w-full flex justify-center items-center mt-4 col-span-2 font ">
          <button 
            onClick={HandleClick} 
            className="btn-read text-sm md:text-lg"
          >
            {showAll ? "کمتر بخوانید" : "بیشتر بخوانید"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
