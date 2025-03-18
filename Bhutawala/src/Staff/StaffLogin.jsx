import { useFormik } from 'formik';
import React, { useState } from 'react'
import { postData } from '../API';
import { LogInSchema } from './Schema';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { confirmationAlert, errorAlert, successAlert } from '../SweetAlert/SuccessAlert';

export default function StaffLogin() {
    const navigate = useNavigate();//Initialize to navigate
    const [initialValues, setinitialValues] = useState({ 
            FullName: (localStorage.getItem("StaffFullName") != null? localStorage.getItem("StaffFullName") : "" ), 
            Password: (localStorage.getItem("StaffPasswd") != null? localStorage.getItem("StaffPasswd") : "" ) });

    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, handleChange, handleBlur, values, errors, resetForm } = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: LogInSchema,
        onSubmit: async (values) => {
            const requestData = {
                FullName: values.FullName,
                Password: values.Password
            };
            console.log(requestData);
            try {
                const response = await postData("StaffMaster/Authentication", requestData);
                console.log(response);
                if (response.status == "OK") {
                    
                    console.log("Successsfully Login");
                    if (document.getElementById("auth-remember-check").checked){
                        localStorage.setItem("StaffFullName", values.FullName);
                        localStorage.setItem("StaffPasswd", values.Password);
                    }
                    else
                    {
                        localStorage.removeItem("StaffFullName");
                        localStorage.removeItem("StaffPasswd");
                    }
                    localStorage.setItem("StaffId", response.result.staffId);
                    localStorage.setItem("StaffUser", response.result.fullName);
                    localStorage.setItem("StaffType", response.result.category);
                    successAlert("Success", "Successsfully LogIn");
                    // setTimeout(() => {
                    //     navigate('/Staff/Category');
                    // }, 3000);  
                }
                else 
                {
                    errorAlert("FullName or Password is wrong !!!");;
                }
            }
            catch (error) {
                errorAlert("Error posting data in component",error.message);
                console.error("Error posting data in component:", error.message);
            }
        }
    });

    return (
        <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
            <div className="bg-overlay" />
            {/* auth-page content */}
            <div className="auth-page-content overflow-hidden pt-lg-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card overflow-hidden card-bg-fill galaxy-border-none">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="p-lg-5 p-4 auth-one-bg h-100">
                                            <div className="bg-overlay" />
                                            <div className="position-relative h-100 d-flex flex-column">
                                                <div className="mb-4">
                                                    <img
                                                        src="assets/images/Bhutawala_images/BT-logo.png"
                                                        alt=""
                                                        height={100}
                                                    />
                                                </div>
                                                <div className="mt-auto">
                                                    <div className="mb-3">
                                                        <i className="ri-double-quotes-l display-4 text-success" />
                                                    </div>
                                                    <div
                                                        id="qoutescarouselIndicators" className="carousel slide" data-bs-ride="carousel"
                                                    >
                                                        <div className="carousel-indicators">
                                                            <button
                                                                type="button"
                                                                data-bs-target="#qoutescarouselIndicators"
                                                                data-bs-slide-to={0}
                                                                className="active"
                                                                aria-current="true"
                                                                aria-label="Slide 1"
                                                            />
                                                            <button
                                                                type="button"
                                                                data-bs-target="#qoutescarouselIndicators"
                                                                data-bs-slide-to={1}
                                                                aria-label="Slide 2"
                                                            />
                                                            <button
                                                                type="button"
                                                                data-bs-target="#qoutescarouselIndicators"
                                                                data-bs-slide-to={2}
                                                                aria-label="Slide 3"
                                                            />
                                                        </div>
                                                        <div className="carousel-inner text-center text-white-50 pb-5">
                                                            <div className="carousel-item active">
                                                                <p className="fs-15 fst-italic">
                                                                    " Great! Clean code, clean design, easy for
                                                                    customization. Thanks very much! "
                                                                </p>
                                                            </div>
                                                            <div className="carousel-item">
                                                                <p className="fs-15 fst-italic">
                                                                    " The theme is really great with an amazing
                                                                    customer support."
                                                                </p>
                                                            </div>
                                                            <div className="carousel-item">
                                                                <p className="fs-15 fst-italic">
                                                                    " Great! Clean code, clean design, easy for
                                                                    customization. Thanks very much! "
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* end carousel */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end col */}
                                    <div className="col-lg-6">
                                        <div className="p-lg-5 p-4">
                                            <div>
                                                <h5 className="text-primary">Welcome Back !</h5>
                                                <p className="text-muted">Sign in to continue to Bhutawala Traders.</p>
                                            </div>
                                            <div className="mt-4">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-3">
                                                        <label htmlFor="FullName" className="form-label">
                                                        FullName
                                                        </label>
                                                        <span className='text-danger'>*{errors.FullName}</span>
                                                        <input type="text" value={values.FullName} onChange={handleChange} onBlur={handleBlur} id='FullName' name='FullName' className='form-control' placeholder='Enter FullName' />
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="float-end">
                                                            <Link to="/Admin/ForgetPassword" className="text-muted">
                                                                Forgot password?
                                                            </Link>
                                                        </div>
                                                        <label className="form-label" htmlFor="password-input">Password</label>
                                                        <span className='text-danger'>*{errors.Password}</span>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">

                                                            <input type={showPassword ? "text" : "password"} className="form-control pe-5 password-input" value={values.Password} onChange={handleChange} onBlur={handleBlur} id='Password' name='Password' placeholder='Enter Password' />

                                                            <button
                                                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon material-shadow-none"
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                id="password-addon"
                                                            >
                                                                <i className={`ri-${showPassword ? "eye-fill" : "eye-close-fill"} align-middle`} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            defaultValue=""
                                                            id="auth-remember-check"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="auth-remember-check"
                                                        >
                                                            Remember me
                                                        </label>
                                                    </div>
                                                    <div className="mt-4">
                                                        <button className="btn btn-success w-100" type="submit">
                                                            Sign In
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* <div className="mt-5 text-center">
                                                <p className="mb-0">
                                                    Don't have an account ?{" "}
                                                    <a
                                                        href="auth-signup-cover.html"
                                                        className="fw-semibold text-primary text-decoration-underline"
                                                    >
                                                        {" "}
                                                        Signup
                                                    </a>{" "}
                                                </p>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* end col */}
                                </div>
                                {/* end row */}
                            </div>
                            {/* end card */}
                        </div>
                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* end container */}
            </div>
            {/* end auth page content */}
            {/* footer */}
            <footer className="footer galaxy-border-none">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <p className="mb-0">
                                    © Bhutawala Traders. Crafted with <i className="mdi mdi-heart text-danger" />{" "}
                                    by Patel Zainab
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* end Footer */}
        </div>

    )
}