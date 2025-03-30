import { useFormik } from 'formik';
import React, { useState } from 'react'
import { postData } from '../API';
import { LogInSchema } from '../Schema';
import { useNavigate } from 'react-router-dom';
import "../css/login.css";
import { Link } from 'react-router-dom';
import { confirmationAlert, errorAlert, successAlert } from '../SweetAlert/SuccessAlert';

export default function LogIn() {
  const navigate = useNavigate();//Initialize to navigate
  const [initialValues, setinitialValues] = useState({
    UserName: (localStorage.getItem("AdminUserName") != null ? localStorage.getItem("AdminUserName") : ""),
    Password: (localStorage.getItem("AdminPasswd") != null ? localStorage.getItem("AdminPasswd") : "")
  });

  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, handleChange, handleBlur, values, errors, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: LogInSchema,
    onSubmit: async (values) => {
      const requestData = {
        UserName: values.UserName,
        Password: values.Password
      };
      console.log(requestData);
      try {
        const response = await postData("Admin/Authentication", requestData);

        console.log(response);
        if (response.status == "OK") {
          successAlert("Success", "Successsfully LogIn");
          console.log("Successsfully Login");


          if (document.getElementById("auth-remember-check").checked) {
            localStorage.setItem("AdminUserName", values.UserName);
            localStorage.setItem("AdminPasswd", values.Password);

          }
          else {
            localStorage.removeItem("AdminUserName");
            localStorage.removeItem("AdminPasswd");

          }

          localStorage.setItem("AdminId", response.result.adminId);
          localStorage.setItem("AdminUser", response.result.userName);
          navigate('/Category');
        }
        else {
          errorAlert("Username or Password is wrong !!!");;

        }
      }
      catch (error) {
        errorAlert("Error posting data in component", error.message);
        console.error("Error posting data in component:", error.message);
      }
    }
  });

  return (

    <div className="auth-page-content d-flex align-items-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            {/* <div className="card overflow-hidden shadow-lg"> */}
              <div className="row g-0">
                <div className="form">
                  <div className="p-lg-5 p-4">
                    <div className="text-center">
                    <span className="logo-lg">
                      <h1><b>Sign In</b></h1>
                        {/* <img src="assets/images/see.jpeg" alt="" style={{ height: 95, width: 200 }} /> */}
                      </span>
                      <p className="text-muted">Sign in to continue to Bhutawala Traders.</p>
                    </div>
                    <div className="mt-4">
                      <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <label htmlFor="UserName" className="form-label">Username
                            <span className='text-danger'>*{errors.UserName}</span></label>
                        </div>
                          <input
                            type="text"
                            value={values.UserName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id='UserName'
                            name='UserName'
                            className='form-control'
                            placeholder='Enter Username'
                          />
                        </div>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <label className="form-label" htmlFor="password-input">Password
                              < span className='text-danger'>*{errors.Password}</span></label>
                            <Link to="/ForgetPassword" className="text-muted small">
                              Forgot password?
                            </Link>
                          </div>
                          <div className="position-relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control pe-5"
                              value={values.Password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id='Password'
                              name='Password'
                              placeholder='Enter Password'
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none text-muted"
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i className={`ri-${showPassword ? "eye-fill" : "eye-close-fill"} align-middle`} />
                            </button>
                          </div>
                        </div>
                        <div className="form-check mb-3">
                          <input className="form-check-input" type="checkbox" id="auth-remember-check" />
                          <label className="form-check-label" htmlFor="auth-remember-check">Remember me</label>
                        </div>
                        <div className="mt-4">
                          <button className="btn btn-success w-100" type="submit">Sign In</button>
                        </div>
                      </form>
                    </div>
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
 
   


  )
}
