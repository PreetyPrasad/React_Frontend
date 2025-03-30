import { Link } from "react-router-dom";
export default function Sidebar(props) {
  return (
    <div className="app-menu navbar-menu">
      {/* LOGO */}
      <div className="navbar-brand-box">
        {/* Dark Logo*/}
        <a href="index-2.html" className="logo logo-dark">
          <span className="logo-sm">
            <img src="assets/images/logo-sm.png" alt="" height={22} />
          </span>
          <span className="logo-lg">
            <img src="assets/images/logo-dark.png" alt="" height={17} />
          </span>
        </a>
        {/* Light Logo*/}
        <a href="index-2.html" className="logo logo-light">
          <span className="logo-sm">
            <img src="/assets/images/Bhutawala_images/BT-logo.jpeg" alt="" height={50} />
          </span>
          <span className="logo-lg">
            <img src="/assets/images/Bhutawala_images/BT-logo.jpeg" alt="" height={100} width={200} />
          </span>
        </a>
        <button
          type="button"
          className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover"
        >
          <i className="ri-record-circle-line" />
        </button>
      </div>
      <div className="dropdown sidebar-user m-1 rounded">
        <button
          type="button"
          className="btn material-shadow-none"
          id="page-header-user-dropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="d-flex align-items-center gap-2">
            <img
              className="rounded header-profile-user"
              src="assets/images/users/avatar-1.jpg"
              alt="Header Avatar"
            />
            <span className="text-start">
              <span className="d-block fw-medium sidebar-user-name-text">
                Anna Adame
              </span>
              <span className="d-block fs-14 sidebar-user-name-sub-text">
                <i className="ri ri-circle-fill fs-10 text-success align-baseline" />{" "}
                <span className="align-middle">Online</span>
              </span>
            </span>
          </span>
        </button>
        <div className="dropdown-menu dropdown-menu-end">
          {/* item*/}
          <h6 className="dropdown-header">Welcome Anna!</h6>
          <a className="dropdown-item" href="pages-profile.html">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Profile</span>
          </a>
          <a className="dropdown-item" href="apps-chat.html">
            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Messages</span>
          </a>
          <a className="dropdown-item" href="apps-tasks-kanban.html">
            <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Taskboard</span>
          </a>
          <a className="dropdown-item" href="pages-faqs.html">
            <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Help</span>
          </a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="pages-profile.html">
            <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">
              Balance : <b>$5971.67</b>
            </span>
          </a>
          <a className="dropdown-item" href="pages-profile-settings.html">
            <span className="badge bg-success-subtle text-success mt-1 float-end">
              New
            </span>
            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Settings</span>
          </a>
          <a className="dropdown-item" href="auth-lockscreen-basic.html">
            <i className="mdi mdi-lock text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Lock screen</span>
          </a>
          <a className="dropdown-item" href="auth-logout-basic.html">
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </a>
        </div>
      </div>
      <div
        id="scrollbar"
        data-simplebar="init"
        className={props.isOpen ? "h-100 simplebar-scrollable-y" : "h-100"}
      >
        <div className="container-fluid">
          <div id="two-column-menu"></div>
          <ul className="navbar-nav" id="navbar-nav">
            <li className="menu-title">
              <span data-key="t-menu">Menu</span>
            </li>
            <Link className="nav-link menu-link" to="/TransactionYear">
              <i class="fas fa-calendar-alt"></i> <span>TransactionYear</span>
            </Link>
            <Link className="nav-link menu-link" to="/Category">
              <i class="fas fa-folder" /> <span>Category</span>
            </Link>
            <Link className="nav-link menu-link" to="/Material">
              <i class="fas fa-box" /> <span>Material</span>
            </Link>

            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarDashboards"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarDashboards"
              >
                <i className="fas fa-shopping-bag"></i> {/* Shopping Bag */}
                <span data-key="t-dashboards">Purchases</span>
              </a>

              <div className="collapse menu-dropdown" id="sidebarDashboards">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/Supplier">
                      <i class="fas fa-truck" /> <span>Supplier</span>
                    </Link>

                    <Link className="nav-link menu-link" to="/PurchaseMaster">
                      <i className="fas fa-shopping-cart"></i>
                      <span>Purchase Master</span>
                    </Link>
                    <Link className="nav-link menu-link" to="/PurchaseReturn">
                      <i className="fas fa-exchange-alt"></i>
                      <span>Purchase Return</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>{" "}
            {/* end Dashboard Menu */}
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#Material"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="Material"
              >
                <i className="fas fa-box-open"></i>
                <span>Sales Return</span>
              </a>
              <div className="collapse menu-dropdown" id="Material">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/SalesReturn">
                      <i className="fas fa-reply"></i>
                      <span>Sales Return</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>{" "}
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#Invoices"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="Invoices"
              >
                <i className="fas fa-file-invoice"></i>
                <span data-key="">Invoices</span>
              </a>

              <div className="collapse menu-dropdown" id="Invoices">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/InvoiceMaster">
                      <i className="fas fa-file-invoice"></i>
                      <span>Invoice Master</span>

                    </Link>
                    <Link className="nav-link menu-link" to="/Staff/Detail">
                      <i class="fas fa-table" /> <span>InvoiceDetail</span>
                    </Link>
                    <Link className="nav-link menu-link" to="/CustomerDues">
                      <i className="fas fa-money-bill-wave"></i>
                      <span>Customer Dues</span>

                    </Link>
                    <Link className="nav-link menu-link" to="/CustomerPayments">
                      <i className="fas fa-arrows-rotate"></i>
                      <span>Customer Payments</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <Link className="nav-link menu-link" to="/OutwordMaster">
                <i className="fas fa-hand-holding-dollar"></i>
                <span>Outward Master</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar-background" />
    </div>
  );
}