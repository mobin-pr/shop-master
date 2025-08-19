import React from "react";
import "./assets/css/footer.css";
import Cookies from "js-cookie";
const Footer = () => {
    const isLoggedIn = !!Cookies.get("access");
    
    return(
      <React.Fragment>
        <article className="footer-option">
          <div className="footer-option-item">
            <img src="https://cdnfa.com/theme-80015/8cca/uploads/home-page/icon-fotter-01.png" alt="پشتیبانی" />
            <h3>پشتیبانی</h3>
            <p>از 10 الی 15 به جز پنجشنبه ها و ایام تعطیل</p>
          </div>

          <div className="footer-option-item">
            <img src="https://cdnfa.com/theme-80015/8cca/uploads/home-page/icon-fotter-02.png" alt="پشتیبانی" />
            <h3>اصالت</h3>
            <p>تضمین اصالت کالا</p>
          </div>

          <div className="footer-option-item">
            <img src="https://cdnfa.com/theme-80015/8cca/uploads/home-page/icon-fotter-03.png" alt="پشتیبانی" />
            <h3>ارسال به موقع</h3>
            <p>ارسال تا حداکثر دو روز کاری</p>
          </div>

          <div className="footer-option-item">
            <img src="https://cdnfa.com/theme-80015/8cca/uploads/home-page/icon-fotter-04.png" alt="پشتیبانی" />
            <h3>مرجوعی</h3>
            <p>طبق قوانین مرجوعی کالا</p>
          </div>
        </article>

        <footer className="footer">
          <article className="footer-boxes">

              {/* <!-- ===== footer-box 1 ===== --> */}
              <div className="footer-box footer-box1">
                  <div className="nav-box-logo">
                      <a href="/">فروشگاه</a>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-white">
                      <span className="material-symbols-outlined">
                          location_on
                      </span>
                      <p className="text-sm">ایران</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-white">
                      <span className="material-symbols-outlined">
                          call
                      </span>
                      <p className="text-sm">امور مشتریان: 09111111111</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-white">
                      <span className="material-symbols-outlined">
                          mail
                      </span>
                      <p className="text-sm">nothing@gmail.com</p>
                  </div>

              </div>

              {/* <!-- ===== footer-box 2 ===== --> */}
              <div className="footer-box">
                  <h2 className="text-xl text-white">صفحات</h2>
                  <ul>
                    <li>
                                      
                  <a href="/" className="footer-links">
                    خانه
                  </a>
                    </li>
                  <li>
                  <a href="/profile" className="footer-links">
                    پروفایل
                  </a>
                </li>
                <li>
                  <a href="/products" className="footer-links">
                    محصولات
                  </a>
                </li>
                <li>
                  <a href="/producers" className="footer-links">
                    سازندگان
                  </a>
                </li>

              </ul>
              </div>

              {/* <!-- ===== footer-box 3 ===== --> */}
              <div className="footer-box">
              <h2 className="text-xl text-white">بیشتر</h2>
              <ul>
              <li>
                          
              <li>
                  <a href="/about" className="footer-links">
                    درباره ما
                  </a>
                </li>
                <li>
                  <a href="/contact" className="footer-links">
                    ارتباط با ما
                  </a>
                </li>

                </li>

                {!isLoggedIn && (
                  <>
                <li>
                  <a href="/login" className="footer-links">
                    ورود
                  </a>
                </li>
                <li>
                  <a href="/signup" className="footer-links">
                    ثبت نام
                  </a>
                </li>
                  </>
                )}
              </ul>
              </div>


              {/* <!-- ===== footer-box 4 ===== --> */}
              <div className="footer-box footer-box4">
              <h2 className="mb-4 text-xl text-white">با ما همراه باشید!</h2>
                  <div className="footer-socialMedia-box flex gap-4 mb-14">
                      <a href="https://t.me" className="text-gray-400 hover:text-blue-500 transition">
                          <i className="fab fa-telegram-plane fa-fw text-lg"></i>
                      </a>
                      <a href="mailto:example@mail.com" className="text-gray-400 hover:text-red-500 transition">
                          <i className="fas fa-envelope fa-fw text-lg"></i>
                      </a>
                      <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500 transition">
                          <i className="fab fa-instagram fa-fw text-lg"></i>
                      </a>
                      <a href="tel:+123456789" className="text-gray-400 hover:text-green-500 transition">
                          <i className="fas fa-phone-alt fa-fw text-lg"></i>
                      </a>
                  </div>

                  <h2 className="text-xl text-white">برای دریافت 10% تخفیف برای اولین سفارش خود ثبت نام کنید</h2>
                  <div className="flex items-center">
                      <input type="email" placeholder="ایمیل" /> 
                      <a href="/" className="btn-input-send mt-4">
                          <i className="material-symbols-outlined">arrow_left_alt</i> 
                      </a>
                  </div>
              </div>

          </article>

          <div className="text-center mt-8 text-white">
            طراحی و توسعه: <a href="https://github.com/farzamvalizade" className="text-blue-400 hover:underline">فرزام ولیزاده </a>و <a href="/" className="text-blue-400 hover:underline">محمد امین نبی زاده</a>
          </div>
        </footer>
      </React.Fragment>
    );
};
export default Footer;
