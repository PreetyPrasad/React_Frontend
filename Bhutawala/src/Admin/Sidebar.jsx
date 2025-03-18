
import { right } from "@popperjs/core";
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
            <img src="assets/images/logo-sm.png" alt="" height={22} />
          </span>
          <span className="logo-lg">
            <img src="assets/images/4.jpg" alt="" style={{ height: 45 }} />
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
              <span data-key="t-menu"></span>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarDashboards"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarDashboards"
              >
                <i className="ri-dashboard-2-line" />{" "}
                <span data-key="t-dashboards">Dashboards</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarDashboards">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a
                      href="dashboard-analytics.html"
                      className="nav-link"
                      data-key="t-analytics"
                    >
                      {" "}
                      Analytics{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="dashboard-crm.html"
                      className="nav-link"
                      data-key="t-crm"
                    >
                      {" "}
                      CRM{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="index-2.html"
                      className="nav-link"
                      data-key="t-ecommerce"
                    >
                      {" "}
                      Ecommerce{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="dashboard-crypto.html"
                      className="nav-link"
                      data-key="t-crypto"
                    >
                      {" "}
                      Crypto{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="dashboard-projects.html"
                      className="nav-link"
                      data-key="t-projects"
                    >
                      {" "}
                      Projects{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="dashboard-nft.html"
                      className="nav-link"
                      data-key="t-nft"
                    >
                      {" "}
                      NFT
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="dashboard-job.html"
                      className="nav-link"
                      data-key="t-job"
                    >
                      Job
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="dashboard-blog.html" className="nav-link">
                      <span data-key="t-blog">Blog</span>{" "}
                      <span className="badge bg-success" data-key="t-new">
                        New
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>{" "}
            <Link className="nav-link menu-link" to="/TransactionYearMaster">
              <i class="fas fa-history" /> <span>TransactionYear</span>
            </Link>
            <Link className="nav-link menu-link" to="/StaffMaster">
              <i class="fas fa-user-tie" /> <span>StaffMaster</span>
            </Link>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#Material"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="Material"
              >
                <i className="fas fa-box-open me-2"></i>
                <span data-key="t-landing">Material</span>
              </a>
              <div className="collapse menu-dropdown" id="Material">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/Category">
                      <i class="fas fa-box" /> <span>Category</span>
                    </Link>
                    <Link className="nav-link menu-link" to="/Material">
                      <i className="fas fa-box-open me-2" /> <span>Material</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>{" "}
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarLanding"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarLanding"
              >
                <i className="fas fa-wallet me-2"></i>
                <span data-key="t-landing">Purchase</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarLanding">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/Supplier">
                      <i class="fas fa-handshake" /> <span>Supplier</span>
                    </Link>
                    <Link to="/PurchaseMaster" className="nav-link">
                      <i className="fas fa-wallet me-2"></i>
                      <span>Purchase</span>
                    </Link>

                    <li className="nav-item">
                      <Link to="/PurchaseReturn" className="nav-link">
                        <i className="fas fa-undo-alt me-2"></i>
                        <span data-key="t-landing">PurchaseReturn</span>
                      </Link>
                    </li>
                  </li>
                </ul>
              </div>
              <div className="collapse menu-dropdown" id="sidebarLanding">
                <ul className="nav nav-sm flex-column">
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#Invoices"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="Invoices"
              >
                <i className="fas fa-file-invoice me-2"></i>
                <span data-key="t-base-ui">Invoice</span>
              </a>
              <div className="collapse menu-dropdown" id="Invoices">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/InvoiceMaster">
                      <i className="fas fa-file-invoice" /> <span>InvoiceMaster</span>
                    </Link>
                    {/* <Link className="nav-link menu-link" to="/InvoiceDetail"> */}
                    {/* <i class="fas fa-receipt" /> <span>InvoiceDetail</span> */}
                    {/* </Link> */}
                  </li>
                  <li className="nav-item">
                  </li>
                </ul>
              </div>
              {/* <Link className="nav-link menu-link" to="/StaffMaster"> */}
              {/* <i class="fas fa-user-tie" /> <span>StaffMaster</span> */}
              {/* </Link> */}
              {/* <Link className="nav-link menu-link" to="/TransactionYearMaster"> */}
              {/* <i class="fas fa-history" /> <span>TransactionYear</span> */}
              {/* </Link> */}
            </li>
          </ul>
        </div>
        {/* Sidebar */}
      </div>
      <div className="sidebar-background" />
    </div>
  );
}