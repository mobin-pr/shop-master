import {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home.jsx';
import ForgetPassword from './components/Forget';
import PasswordResetConfirmation from './components/PasswordResetConfrimation';
import Nav from './components/Nav';
import About from './components/About';
import Contact from './components/Contact';
import AllProduct from './components/All';
import UserProfile from './components/Profile';
import SignUp from './components/Register';
import Footer from "./components/Footer";
import Login from './components/Login';
import Producers from './components/Producers.jsx';
import ProductCheckout from './components/CheckOut';
import SearchResults from './components/Search';
import ProducerProducts from "./components/ProducerProducts"; 
import EditUserInfo from './components/EditProfile.jsx';
import CategoryProducts from './components/CategoryProduct.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Cart from './components/Cart.jsx';
import axios from 'axios';
import Cookies from 'js-cookie';
function AppContent() {
  const location = useLocation();
  const hideNavAndFooter1 = location.pathname === '/login';
  const hideNavAndFooter2 = location.pathname === '/signup';
  const hideNavAndFooter3 = location.pathname === '/forget';
  const hideNavAndFooter4 = location.pathname === '/confrim';

  

  const checkLoginStatus = async () => {
      const accessToken = Cookies.get("access");

      if (!accessToken) {
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
          }
      }
  };

  const refreshToken = async () => {
      const refreshToken = Cookies.get("refresh");
      if (!refreshToken) {
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
      }
  };


  useEffect(() => {
      checkLoginStatus();
  }, []);


  return (
    <>
      {!hideNavAndFooter1 && !hideNavAndFooter2 && !hideNavAndFooter3 && !hideNavAndFooter4 && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/producers' element={<Producers />} />
        <Route path="/products" element={< AllProduct/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<UserProfile />}></Route>
        <Route path='/forget' element={<ForgetPassword />}></Route>
        <Route path='/confrim' element={<PasswordResetConfirmation />}></Route>
        <Route path='/checkout' element={<ProductCheckout />}></Route>
        <Route path='/search' element={<SearchResults />} />
        <Route path="/producer/:username" element={<ProducerProducts />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/edit' element={<EditUserInfo />} />
        <Route path='/cart' element={<Cart />} />

      </Routes>
      {!hideNavAndFooter1 && !hideNavAndFooter2 && !hideNavAndFooter3 && !hideNavAndFooter4 && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
export default App;
