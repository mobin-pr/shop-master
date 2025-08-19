import { useState } from "react";
import * as Yup from "yup";
import "./assets/css/signUp.css";
import "./assets/css/modal.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

const SignUp = () => {
    const [inputUsername, setInputUsername] = useState(false);
    const handleInputUsername = () => {
        if (formData.username) {
            setInputUsername(true);
        } else {
            setInputUsername((prevState) => !prevState);
        }
    };

    const [inputEmail, setInputEmail] = useState(false);
    const handleInputEmail = () => {
        if (formData.email) {
            setInputEmail(true);
        } else {
            setInputEmail((prevState) => !prevState);
        }
    };

    const [inputPassword1, setInputPassword1] = useState(false);
    const handleInputPassword1 = () => {
        if (formData.password1) {
            setInputPassword1(true);
        } else {
            setInputPassword1((prevState) => !prevState);
        }
    };

    const [inputPassword2, setInputPassword2] = useState(false);
    const handleInputPassword2 = () => {
        if (formData.password2) {
            setInputPassword2(true);
        } else {
            setInputPassword2((prevState) => !prevState);
        }
    };

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const myValidation = Yup.object().shape({
        username: Yup.string()
            .required("لطفا یوزرنیم خود را وارد کنید"),
        email: Yup.string()
            .required("لطفا ایمیل خود را وارد کنید")
            .email("لطفا ایمیل خود را به درستی وارد کنید"),
        password1: Yup.string()
            .required("لطفا رمز عبور خود را وارد کنید")
            .min(8, "رمز عبور باید بیش از 8 کارکتر باشد"),
        password2: Yup.string()
            .required("لطفا رمز عبور خود را وارد کنید")
            .oneOf([Yup.ref("password1")], "رمزهای عبور یکسان نیستند"),
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [serverError, setServerError] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await myValidation.validate(formData, { abortEarly: false });
            setErrors({});


            await axios.post('http://localhost:8000/api/account/create/', formData);

            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/');
            }, 2000);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                const errorData = err.response.data; 
        
                const serverErrors = Object.entries(errorData).reduce((acc, [key, value]) => {
                    acc[key] = Array.isArray(value) ? value.join(", ") : value;
                    return acc;
                }, {});
                setErrors(serverErrors); 
                console.log(serverError)
            } else if (err.inner) {
                const newError = err.inner.reduce((acc, current) => {
                    acc[current.path] = current.message;
                    return acc;
                }, {});
                setErrors(newError);
                console.log(newError)
            } else {
                setServerError("مشکلی در اتصال به سرور رخ داده است.");
            }
        }
        
    };

    return (
        <section className="main">
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <h1>ثبت‌نام</h1>

                    <div className="input-box">
                        <label
                            id="label-username"
                            required=""
                            style={{ top: inputUsername ? "0" : "50%" }}
                        >
                            نام کاربری
                        </label>
                        <input
                            type="text"
                            className="inputtt"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            onClick={handleInputUsername}
                        />
                        <i className="material-symbols-outlined icon-input">person</i>
                    </div>
                    <p className="error-text">{errors.username}</p>


                    <div className="input-box">
                        <i className="material-symbols-outlined icon-input">mail</i>
                        <label
                            id="label-email"
                            required=""
                            style={{ top: inputEmail ? "0" : "50%" }}
                        >
                            ایمیل
                        </label>
                        <input
                            type="email"
                            className="inputtt"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onClick={handleInputEmail}
                        />
                    </div>
                    <p className="error-text">{errors.email}</p>


                    <div className="input-box">
                        <label
                            id="label-password1"
                            required=""
                            style={{ top: inputPassword1 ? "0" : "50%" }}
                        >
                            رمز عبور
                        </label>
                        <input
                            type="password"
                            className="inputtt"
                            name="password1"
                            value={formData.password1}
                            onChange={handleChange}
                            onClick={handleInputPassword1}
                        />
                        <i className="material-symbols-outlined icon-input">lock</i>
                    </div>
                    <p className="error-text">{errors.password1}</p>
                    <div className="input-box">
                        <label
                            id="label-password2"
                            required=""
                            style={{ top: inputPassword2 ? "0" : "50%" }}
                        >
                            تکرار رمز عبور
                        </label>
                        <input
                            type="password"
                            className="inputtt"
                            name="password2"
                            value={formData.password2}
                            onChange={handleChange}
                            onClick={handleInputPassword2}
                        />
                        <i className="material-symbols-outlined icon-input">lock</i>
                    </div>
                    <p className="error-text">{errors.password2}</p>
                    {serverError && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                            <button
                                className="absolute top-2 left-2 text-gray-600 hover:text-gray-900"
                                onClick={() => setServerError("")}
                            >
                                <i className="fas fa-times fa-lg mt-3 ml-2"></i>
                            </button>
                            <h2 className="text-lg font-semibold mb-4">مشکلی رخ داده است</h2>
                            </div>
                        </div>
                    )}
                    <button type="submit" className="btn-login">
                        ثبت‌نام
                    </button>

                    <div className="register-link">
                        <p className="mb-4">
                            اکانتی دارید؟
                            <a href="/login" className="btn-register mr-2">
                                {" "}
                                وارد شوید
                            </a>
                        </p>
                        <Link to="/" className="text-blue-200 hover:underline">بازگشت به خانه</Link>
                    </div>
                </form>
            </div>


            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>ثبتنام شما با موفقیت انجام شد</p>
                        <div className="timer"></div> 
                    </div>
            </div>
            )}
        </section>
    );
};

export default SignUp;
