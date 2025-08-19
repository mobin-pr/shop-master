import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./assets/css/styles.css";

const Nav = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchText.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
    }
  };


  const [showAll, setShowAll] = useState(false);
  const handleToggleShowAll = () => {
    setShowAll((prevState) => !prevState);
  };

  const [showHumbergerMenu, setShowHumbergerMenu] = useState(false);
  const handleShowHumbergerMenu = () => {
    setShowHumbergerMenu((prevState) => !prevState);
  };

  const [showPagesMenu, setShowPagesMenu] = useState(false);
  const handlePagesMenuHover = () => setShowPagesMenu(true);
  const handlePagesMenuLeave = () => setShowPagesMenu(false);

  const [visible, setVisible] = useState(false);
  const GoUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showHumbergerMenu) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showHumbergerMenu]);


  const isLoggedIn = !!Cookies.get("access");

  return (
    <React.Fragment>
      <div
        className={`overlay ${showHumbergerMenu ? "show" : ""}`}
        style={{ zIndex: "999" }}
        onClick={handleShowHumbergerMenu}
      ></div>
      <nav id="nav-main">
        <div
          className="popup-wrappper"
          style={{ zIndex: showHumbergerMenu ? "9999" : "-1" }}
        >
          <div className="navbar bg-blue-500" id="navbar">
            <article className="nav-container">
              <div className="navbar-box-links flex gap-8 items-center">
                <div className="nav-box-logo">
                  <Link to="/">فروشگاه</Link>
                </div>

                <ul className="navbar-box-links-container">
                  <li><Link to="/">خانه</Link></li>
                  <li
                    onMouseEnter={handlePagesMenuHover}
                    onMouseLeave={handlePagesMenuLeave}
                  >
                    <Link>صفحات</Link>
                    {showPagesMenu && (
                      <ul className="dropdown">
                        {!isLoggedIn &&(
                          <div>
                            <li><Link className="color-link" to="/products">محصولات</Link></li>
                            <li><Link className="color-link" to="/producers">سازندگان</Link></li>
                          </div>
                        )}
                        <li><Link className="color-link" to="/about">درباره ما</Link></li>
                        <li><Link className="color-link" to="/contact">ارتباط با ما</Link></li>
                      </ul>
                    )}
                  </li>
                  {!isLoggedIn && ( 
                    <li id="auth">
                      <Link to="/login">ورود</Link>|<Link to="/signup">ثبت‌نام</Link>
                    </li>
                  )}
                  {isLoggedIn &&(
                    <div>
                      <li><Link className="color-link" to="/products">محصولات</Link>
                      <Link className="color-link" to="/producers">سازندگان</Link></li>
                    </div>
                  )}
                </ul>
              </div>

              <div className="nav-box-media">
              <input
                type="search"
                placeholder="جستجو..."
                className="nav-input-serach"
                style={{ display: showAll ? "table" : "none" }}
                id="nav-input-search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleSearchKeyDown} 
              />
                <Link>
                  <i
                    className="fa-solid fa-magnifying-glass search-icon"
                    id="nav-icon-serach"
                    onClick={handleToggleShowAll}
                  ></i>
                </Link>
                <Link to="/cart">
                  <i
                    className="fa-solid fa-cart-shopping"     
                  ></i>
                </Link>
                <Link to="/profile">
                  <i className="fa-regular fa-user"></i>
                </Link>
                <Link>
                  <i
                    className="material-symbols-outlined hamburger-menu"
                    onClick={handleShowHumbergerMenu}
                  >
                    menu
                  </i>
                </Link>
              </div>
            </article>
          </div>

          <section
            className="menu-responsive "
            style={{ display: showHumbergerMenu ? "table" : "none" }}
          >
            <div className="box1">
              <div className="box2" id="box2">
                <div className="menu-responsive-box">
                  <div className="menu-responsive-container">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div className="nav-box-logo">
                        <a href="/">فروشگاه</a>
                      </div>
                      <i
                        className="material-symbols-outlined navbar-close-icon"
                        style={{ color: "red" }}
                        onClick={handleShowHumbergerMenu}
                      >
                        close
                      </i>
                    </div>

                    <input
                      type="search"
                      placeholder="جستوجو..."
                      className="menu-responsive-input-serach"
                    />

                    <ul className="menu-responsive-link-box">
                      <li>
                        <Link className="color-link" to="/products">
                          محصولات
                        </Link>
                      </li>
                      <li>
                        <Link className="color-link" to="/producers">
                          سازندگان ها
                        </Link>
                      </li>
                      <li>
                        <Link className="color-link" to="/about">
                          درباره ما
                        </Link>
                      </li>
                      <li>
                        <Link className="color-link" to="/contact">
                          ارتباط با ما
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        <div
          className={`go-up ${visible ? "show" : ""}`}
          onClick={GoUp}
        >
          <span>↑</span>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
