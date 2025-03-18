import React, { useEffect } from 'react'
// import { LogInSchema } from './Schema';
import { useNavigate, Link } from 'react-router-dom';
import { confirmationAlert } from '../SweetAlert/SuccessAlert';

export default function LogOut() {

    const navigate = useNavigate();//Initialize to navigate
    useEffect(() => {
        localStorage.removeItem("AdminId");
        localStorage.removeItem("AdminUser");
        confirmationAlert("Are you sure you want to LogOut");
    }, [navigate]);

    return (
        <div className="auth-page-wrapper pt-5">
            {/* auth page bg */}
            <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
                <div className="bg-overlay" />
                <div className="shape">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 1440 120"
                    >
                        <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
                    </svg>
                </div>
            </div>
            {/* auth page content */}
            <div className="auth-page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center mt-sm-5 mb-4 text-white-50">
                                <div>
                                    <a href="index-2.html" className="d-inline-block auth-logo">
                                        <img src="assets/images/logo-light.png" alt="" height={20} />
                                    </a>
                                </div>
                                <p className="mt-3 fs-15 fw-medium">
                                    Premium Admin &amp; Dashboard Template
                                </p>
                            </div>

                        </div>
                    </div>
                    {/* end row */}
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="card mt-4 card-bg-fill">
                                <div className="card-body p-4 text-center">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/hzomhqxz.json"
                                        trigger="loop"
                                        colors="primary:#405189,secondary:#08a88a"
                                        style={{ width: 180, height: 180 }}
                                    />
                                    <div className="mt-4 pt-2">
                                        <h5>You are Logged Out</h5>
                                        <p className="text-muted">
                                            Thank you for using{" "}
                                            <span className="fw-semibold">Bhutawala Traders</span> Admin
                                        </p>
                                        <div className="mt-4">
                                            <Link to="/" className="btn btn-success w-100">
                                                Sign In
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* end card body */}
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
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <p className="mb-0 text-muted">
                                    © Bhutawala Traders. Crafted with <i className="mdi mdi-heart text-danger" />{" "}
                                    by Preety
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    )
}
