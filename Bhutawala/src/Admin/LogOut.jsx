import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { confirmationAlert } from '../SweetAlert/SuccessAlert';

export default function LogOut() {
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    localStorage.removeItem("AdminId");
    localStorage.removeItem("AdminUser");

    confirmationAlert("Are you sure you want to LogOut").then((result) => {
      if (result.isConfirmed) {
        navigate("/login"); // Redirect after confirmation
      }
    });
  }, [navigate]);

  return (
    <div className="auth-page-wrapper d-flex flex-column min-vh-100">
      {/* Logout Content */}
      <div className="auth-page-content flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-lg rounded-lg p-4 text-center">
                {/* Logout Animation */}
                <img
                  src="https://cdn.lordicon.com/hzomhqxz.json"
                  alt="Logout Icon"
                  className="logout-icon"
                  width="150"
                  height="150"
                />

                <h5 className="mt-4">You are Logged Out</h5>
                <p className="text-muted">
                  Thank you for using <span className="fw-semibold">Bhutawala Traders</span> Admin.
                </p>

                {/* Sign In Button */}
                <Link to="/" className="btn btn-primary w-100 mt-3">
                  Sign In Again
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer text-center py-3 mt-auto">
        <p className="mb-0 text-muted">
          © {new Date().getFullYear()} Bhutawala Traders. Crafted with ❤️ by Preety
        </p>
      </footer>
    </div>
  );
}
