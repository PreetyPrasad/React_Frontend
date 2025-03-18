import {useFormik } from 'formik';
import React, { useState } from 'react'
import { postData } from '../API';
// import { CreatePasswordSchema } from './Schema';
import { useNavigate } from 'react-router-dom';

export default function CreatePassword() {
    const navigate = useNavigate();//Initialize to navigate
    const [initialValues, setinitialValues] = useState({ CreatePassword: "", ConfirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { handleSubmit, handleChange, handleBlur, values, errors, resetForm } = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        // validationSchema: CreatePasswordSchema,
        onSubmit: async (values) => {
            const requestData = {
                CreatePassword: values.CreatePassword,
                ConfirmPassword: values.ConfirmPassword
            };
            console.log(requestData);
            try {
                const response = await postData("Staff/AuthenticationStaff", requestData);

                console.log(response);
                if (response.status == "OK") {
                    console.log("Created Successsfully");
                    localStorage.setItem("StaffId", response.result.id);
                    localStorage.setItem("AdminFullName", response.result.fullName);
                    navigate('/Staff/AutheticationStaff');
                }
                else {
                    alert("Create Password or Confirm Password is wrong !!!");
                }
            }
            catch (error) {
                console.error("Error posting data in component:", error.message);
            }
        }
    });



    return (
        <>
            {/* auth-page wrapper */}
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay" />
                {/* auth-page content */}
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card overflow-hidden card-bg-fill galaxy-border-none">
                                    <div className="row justify-content-center g-0">
                                        <div className="col-lg-6">
                                            <div className="p-lg-5 p-4 auth-one-bg h-100">
                                                <div className="bg-overlay" />
                                                <div className="position-relative h-100 d-flex flex-column">
                                                    <div className="mb-4">
                                                        <a href="index-2.html" className="d-block">
                                                            <img
                                                                src="assets/images/logo-light.png"
                                                                alt=""
                                                                height={18}
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="mt-auto">
                                                        <div className="mb-3">
                                                            <i className="ri-double-quotes-l display-4 text-success" />
                                                        </div>
                                                        <div
                                                            id="qoutescarouselIndicators"
                                                            className="carousel slide"
                                                            data-bs-ride="carousel"
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
                                                <h5 className="text-primary">Create new password</h5>
                                                <p className="text-muted">
                                                    Your new password must be different from previous used
                                                    password.
                                                </p>
                                                <div className="p-2">
                                                    <form onSubmit={handleSubmit} >
                                                        <div className="mb-3">
                                                            <label htmlFor="CreatePassword" className="form-label">
                                                                Create Password
                                                            </label>
                                                            <span className="text-danger">*{errors.CreatePassword}</span>
                                                            <div className="position-relative auth-pass-inputgroup">
                                                                <input
                                                                    type={showPassword ? "text" : "password"}
                                                                    value={values.CreatePassword}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    id="CreatePassword"
                                                                    name="CreatePassword"
                                                                    className="form-control pe-5 password-input"
                                                                    placeholder="Enter Password"
                                                                    required=""
                                                                />
                                                                <button
                                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon material-shadow-none"
                                                                    type="button"
                                                                    id="password-addon"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                >
                                                                    <i className={`ri-${showPassword ? "eye-fill" : "eye-close-fill"} align-middle`} />
                                                                </button>
                                                            </div>
                                                            <div id="passwordInput" className="form-text">Must be at least 6 characters.</div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="ConfirmPassword"
                                                            >
                                                                Confirm Password
                                                            </label>
                                                            <span className="text-danger">*{errors.ConfirmPassword}</span>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <input
                                                                    type={showConfirmPassword ? "text" : "password"}
                                                                    value={values.ConfirmPassword}
                                                                    onChange={handleChange}
                                                                    id="ConfirmPassword"
                                                                    name="ConfirmPassword"
                                                                    className="form-control pe-5 password-input"
                                                                    onpaste="return false"
                                                                    placeholder="Confirm password"

                                                                    required=""
                                                                />
                                                                <button
                                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon material-shadow-none"
                                                                    type="button"
                                                                    id="confirm-password-input"
                                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                >
                                                                    <i className={`ri-${showConfirmPassword ? "eye-fill" : "eye-close-fill"} align-middle`} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div
                                                            id="password-contain"
                                                            className="p-3 bg-light mb-2 rounded"
                                                        >
                                                            <h5 className="fs-13">Password must contain:</h5>
                                                            <p id="pass-length" className="invalid fs-12 mb-2">
                                                                Minimum <b>6 characters</b>
                                                            </p>
                                                            <p id="pass-lower" className="invalid fs-12 mb-2">
                                                                At <b>lowercase</b> letter (a-z)
                                                            </p>
                                                            <p id="pass-upper" className="invalid fs-12 mb-2">
                                                                At least <b>uppercase</b> letter (A-Z)
                                                            </p>
                                                            <p id="pass-number" className="invalid fs-12 mb-0">
                                                                A least <b>number</b> (0-9)
                                                            </p>
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
                                                            <button
                                                                className="btn btn-success w-100"
                                                                type="submit"
                                                            >
                                                                Reset Password
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                                {/* <div className="mt-5 text-center">
                                                    <p className="mb-0">
                                                        Wait, I remember my password...{" "}
                                                        <Link
                                                            href="auth-signin-cover.html"
                                                            className="fw-semibold text-primary text-decoration-underline"
                                                        >
                                                            {" "}
                                                            Click here{" "}
                                                        </Link>{" "}
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
            </div>
        </>

    )
}
