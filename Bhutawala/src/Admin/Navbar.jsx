import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="index-2.html">
          <img src="images/logo.svg" alt="logo" height="30" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="languageDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="flag-icon flag-icon-us me-1"></i>
                English
              </a>
              <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="flag-icon flag-icon-cn me-2"></i> Chinese
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="flag-icon flag-icon-es me-2"></i> Spanish
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="flag-icon flag-icon-bl me-2"></i> French
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="flag-icon flag-icon-ae me-2"></i> Arabic
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex me-3">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">
              <i className="mdi mdi-magnify"></i>
            </button>
          </form>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="images/faces/face1.jpg"
                  alt="Profile"
                  className="rounded-circle me-2"
                  width="30"
                />
                Larry Garner
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><a className="dropdown-item" href="#">Manage Accounts</a></li>
                <li><a className="dropdown-item" href="#">Change Password</a></li>
                <li><a className="dropdown-item" href="#">Check Inbox</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Sign Out</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="mdi mdi-bell-outline"></i>
                <span className="badge bg-danger">4</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="mdi mdi-email-outline"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
