import { Link } from "react-router-dom";

export default function Header(props) {

  return (
    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex">
            {/* LOGO */}
            <div className="navbar-brand-box horizontal-logo">
              <a href="index-2.html" className="logo logo-dark">
                <span className="logo-sm">
                  <img src="assets/images/logo-sm.png" alt="" height={22} />
                </span>
                <span className="logo-lg">
                  <img src="assets/images/logo-dark.png" alt="" height={17} />
                </span>
              </a>
              <a href="index-2.html" className="logo logo-light">
                <span className="logo-sm">
                  <img src="assets/images/logo-sm.png" alt="" height={22} />
                </span>
                <span className="logo-lg">
                  <img src="assets/images/logo-light.png" alt="" height={17} />
                </span>
              </a>
            </div>
            <button
              type="button"
              onClick={() => props.openSidebar()}
              className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger material-shadow-none"
              id="topnav-hamburger-icon"
            >
              <span
                className={props.isOpen ? "hamburger-icon" : "hamburger-icon open"}
              >
                <span />
                <span />
                <span />
              </span>
            </button>
            {/* App Search*/}
            <form className="app-search d-none d-md-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  autoComplete="off"
                  id="search-options"
                  defaultValue=""
                />
                <span className="mdi mdi-magnify search-widget-icon" />
                <span
                  className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                  id="search-close-options"
                />
              </div>
              <div
                className="dropdown-menu dropdown-menu-lg"
                id="search-dropdown"
              >
                <div data-simplebar="" style={{ maxHeight: 320 }}>
                  {/* item*/}
                  <div className="dropdown-header">
                    <h6 className="text-overflow text-muted mb-0 text-uppercase">
                      Recent Searches
                    </h6>
                  </div>
                  <div className="dropdown-item bg-transparent text-wrap">
                    <a
                      href="index-2.html"
                      className="btn btn-soft-secondary btn-sm rounded-pill"
                    >
                      how to setup <i className="mdi mdi-magnify ms-1" />
                    </a>
                    <a
                      href="index-2.html"
                      className="btn btn-soft-secondary btn-sm rounded-pill"
                    >
                      buttons <i className="mdi mdi-magnify ms-1" />
                    </a>
                  </div>
                  {/* item*/}
                  <div className="dropdown-header mt-2">
                    <h6 className="text-overflow text-muted mb-1 text-uppercase">
                      Pages
                    </h6>
                  </div>
                  {/* item*/}
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item"
                  >
                    <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2" />
                    <span>Analytics Dashboard</span>
                  </a>
                  {/* item*/}
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item"
                  >
                    <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2" />
                    <span>Help Center</span>
                  </a>
                  {/* item*/}
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item"
                  >
                    <i className="ri-user-settings-line align-middle fs-18 text-muted me-2" />
                    <span>My account settings</span>
                  </a>
                  {/* item*/}
                  <div className="dropdown-header mt-2">
                    <h6 className="text-overflow text-muted mb-2 text-uppercase">
                      Members
                    </h6>
                  </div>
                  <div className="notification-list">
                    {/* item */}
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item py-2"
                    >
                      <div className="d-flex">
                        <img
                          src="assets/images/users/avatar-2.jpg"
                          className="me-3 rounded-circle avatar-xs"
                          alt="user-pic"
                        />
                        <div className="flex-grow-1">
                          <h6 className="m-0">Angela Bernier</h6>
                          <span className="fs-11 mb-0 text-muted">Manager</span>
                        </div>
                      </div>
                    </a>
                    {/* item */}
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item py-2"
                    >
                      <div className="d-flex">
                        <img
                          src="assets/images/users/avatar-3.jpg"
                          className="me-3 rounded-circle avatar-xs"
                          alt="user-pic"
                        />
                        <div className="flex-grow-1">
                          <h6 className="m-0">David Grasso</h6>
                          <span className="fs-11 mb-0 text-muted">
                            Web Designer
                          </span>
                        </div>
                      </div>
                    </a>
                    {/* item */}
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item py-2"
                    >
                      <div className="d-flex">
                        <img
                          src="assets/images/users/avatar-5.jpg"
                          className="me-3 rounded-circle avatar-xs"
                          alt="user-pic"
                        />
                        <div className="flex-grow-1">
                          <h6 className="m-0">Mike Bunch</h6>
                          <span className="fs-11 mb-0 text-muted">
                            React Developer
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="text-center pt-3 pb-1">
                  <a
                    href="pages-search-results.html"
                    className="btn btn-primary btn-sm"
                  >
                    View All Results <i className="ri-arrow-right-line ms-1" />
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div className="d-flex align-items-center">
            <div className="dropdown d-md-none topbar-head-dropdown header-item">
              <button
                type="button"
                className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                id="page-header-search-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bx bx-search fs-22" />
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <button className="btn btn-primary" type="submit">
                        <i className="mdi mdi-magnify" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="ms-1 header-item d-none d-sm-flex">
              <button
                type="button"
                className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                onClick={props.toggleFullscreen}
              >
                <i
                  className={`bx ${props.isFullscreen ? "bx-exit-fullscreen" : "bx-fullscreen"
                    } fs-22`}
                />
              </button>
            </div>
            <div className="ms-1 header-item">
              <button
                type="button"
                className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle light-dark-mode d-flex align-items-center justify-content-center"
                onClick={props.toggleTheme}
                style={{ width: "40px", height: "40px" }}
              >
                <i
                  className={`bx ${props.theme === "light" ? "bx-moon" : "bx-sun"} fs-22`}
                />
              </button>
            </div>
            <div className="dropdown ms-sm-3 header-item topbar-user">
              <button
                type="button"
                className="btn material-shadow-none"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  <img
                    className="rounded-circle header-profile-user"
                    src="/assets/images/Bhutawala_images/BT-logo.png"
                    alt="Header Avatar"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  />
                  <span className="text-start ms-2 d-none d-sm-block">
                    <span className="d-inline-block fw-bold user-name-text text-dark">
                      Bhutawala Traders
                    </span>
                    <br />
                    <span className="fs-12 text-muted user-name-sub-text">Founder</span>
                  </span>
                </span>

              </button>
              <div className="dropdown-menu dropdown-menu-end">
                {/* item*/}
                <h6 className="dropdown-header">Welcome Bhutawala!</h6>
                <Link className="dropdown-item d-flex align-items-center" to="/Profile">
                  <i className="mdi mdi-account-circle text-primary fs-18 me-2"></i>
                  <span className="fw-bold text-dark">Profile</span>
                </Link>
                <Link className="dropdown-item d-flex align-items-center" to="/ResetPassword">
                  <i className="mdi mdi-lock-reset text-primary fs-18 me-2"></i>
                  <span className="fw-bold text-dark">Reset Password</span>
                </Link>
                <Link className="dropdown-item d-flex align-items-center" to="/LogOut">
                  <i className="mdi mdi-logout text-danger fs-18 me-2"></i>
                  <span className="fw-bold text-dark">Logout</span>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
