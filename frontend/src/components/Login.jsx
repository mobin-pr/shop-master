import { useState } from "react";
import * as Yup from "yup";
import "./assets/css/signUp.css";
import "./assets/css/modal.css";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import Cookies from 'js-cookie';

const Login = () => {
    const [inputUsername, setInputUsername] = useState(false);
    const [inputPassword, setInputPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const myValidation = Yup.object().shape({
        username: Yup.string().required("لطفا یوزرنیم خود را وارد کنید"),
        password: Yup.string().required("لطفا رمز عبور خود را وارد کنید").min(6, "رمز عبور باید بیش از 6 کارکتر باشد")
    });

    const handleInputUsername = () => {
        if (formData.username) {
            setInputUsername(true);
        } else {
            setInputUsername((prevState) => !prevState);
        }
    };

    const handleInputPassword = () => {
        if (formData.password) {
            setInputPassword(true);
        } else {
            setInputPassword((prevState) => !prevState);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await myValidation.validate(formData, { abortEarly: false });
            setErrors({});
            setServerError(""); // Clear server errors

            const response = await axios.post('http://localhost:8000/api/auth/login/', formData);
            console.log(response)
            const access = response.data.access; 
            Cookies.set("access",access)
            const refresh = response.data.refresh; 
            Cookies.set("refresh",refresh)
            setShowModal(true); 
            setTimeout(() => {
                setShowModal(false); 
                navigate('/');
            }, 2000);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setServerError("نام کاربری یا رمز عبور اشتباه است.");
            } else if (err.inner) {
                const newError = err.inner.reduce((acc, current) => {
                    acc[current.path] = current.message;
                    return acc;
                }, {});
                setErrors(newError);
            } else {
                setServerError("مشکلی در اتصال به سرور رخ داده است.");
            }
        }
    };

    return (
        <section className="main">
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <h1>ورود</h1>

                    <div className="input-box">
                        <i className="material-symbols-outlined icon-input">mail</i>
                        <label id="label-email" required=""  style={{ top: inputUsername ? "0" : "50%" }}>نام کاربری</label>
                        <input type="text" className="inputtt" name="username" value={formData.username} onChange={handleChange} onClick={handleInputUsername} />
                    </div>
                    <p className="error-text">{errors.username}</p>

                    <div className="input-box">
                        <i className="material-symbols-outlined icon-input">lock</i>
                        <label id="label-password" required="" style={{ top: inputPassword ? "0" : "50%" }}>رمز عبور</label>
                        <input type="password" className="inputtt" name="password" value={formData.password} onChange={handleChange} onClick={handleInputPassword} />
                    </div>
                    <p className="error-text">{errors.password}</p>

                    {serverError && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                                <button
                                    className="absolute top-2 left-2 text-gray-600 hover:text-gray-900"
                                    onClick={() => setServerError("")}
                                >
                                    <i className="fas fa-times fa-lg mt-3 ml-2"></i>
                                </button>
                                <h2 className="text-lg font-semibold mb-4">{serverError}</h2>
                            </div>
                        </div>
                    )}

                    <button type="submit" className="btn-login">ورود</button>

                    <div className="register-link">
                        <p className="mb-4">
                            اکانتی ندارید؟
                            <Link to="/signup" className="btn-register mr-2">ثبت نام</Link>
                        </p>
                        <Link to="/" className="text-blue-200 hover:underline">بازگشت به خانه</Link>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>ورود شما با موفقیت انجام شد!</p>
                        <div className="timer"></div> 
                    </div>
                </div>
            )}
        </section>
    );
};

export default Login;
