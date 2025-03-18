import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ResetPasswordSchema } from "../Schema";
import { useFormik } from "formik";
import { postData } from "../API";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState({
    oldPasswd: false,
    newPasswd: false,
    confirmPasswd: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const [initialValues] = useState({ oldPasswd: "", newPasswd: "", Password: "" });
  const { handleSubmit, handleChange, handleBlur, values, errors, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      const requestData = {
        oldPasswd: values.oldPasswd,
        newPasswd: values.newPasswd,
        Password: values.Password,
        AdminId: localStorage.getItem("AdminId")
      };
      console.log(requestData);
      try {
        const response = await postData("Admin/ChangePassword", requestData);
        console.log(response);
        if (response.status.toUpperCase() === "OK") {
          console.log("Successfully Saved");
        } else {
          alert("Username or Password is wrong !!!");
        }
      } catch (error) {
        console.error("Error posting data in component:", error.message);
      }
    },
  });



  return (
    <div className="auth-page-wrapper pt-5">
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay" />
      </div>
      <div className="auth-page-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4 card-bg-fill">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Reset Password</h5>
                    <p className="text-muted">Get your account now</p>
                  </div>
                  <div className="p-2 mt-4">
                    <form onSubmit={handleSubmit}>
                      {["oldPasswd", "newPasswd", "Password"].map((field, index) => (
                        <div className="mb-3" key={index}>
                          <label htmlFor={field} className="form-label">
                            {field === "oldPasswd"
                              ? "Old Password"
                              : field === "newPasswd"
                                ? "New Password"
                                : "Confirm Password"} <span className="text-danger">*{errors[field]}</span>
                          </label>
                          <div className="position-relative auth-pass-inputgroup">


                            <input
                              type={showPassword[field] ? "text" : "password"}
                              className="form-control pe-5 password-input"
                              value={values[field]}
                              placeholder={
                                field === "oldPasswd"
                                  ? "Enter Old Password"
                                  : field === "newPasswd"
                                    ? "Enter New Password"
                                    : "Enter Confirm Password"
                              }
                              id={field}
                              name={field}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              onClick={() => togglePasswordVisibility(field)}
                            >
                              <i className={`ri-${showPassword[field] ? "eye-fill" : "eye-close-fill"} align-middle`} />
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="mb-0">
                  Already have an account? {" "}
                  <Link to="/" className="fw-semibold text-primary text-decoration-underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
