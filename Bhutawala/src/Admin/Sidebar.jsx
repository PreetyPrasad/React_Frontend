
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
            {/* category */}
            <li className="nav-item">
              <Link to="/Category" className="nav-link">
                <i className="ri-apps-2-line" style={{ marginRight: 5 }} />
                <span data-key="t-landing">Category</span>

              </Link>
            </li>
            {/* Matereial */}
            <li className="nav-item">
              <Link to="/Material" className="nav-link">
                <i className="fa fa-cart-plus" style={{ marginRight: 5 }} />
                <span data-key="t-landing">Material</span>
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarLanding"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarLanding"
              >
                <i className="fa fa-wallet" />
                <span data-key="t-landing">Purchase</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarLanding">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link to="/PurchaseMaster" className="nav-link"><span data-key="t-landing">Purchase</span></Link>
                  </li>
                </ul>
              </div>
              <div className="collapse menu-dropdown" id="sidebarLanding">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link to="/InwordStock" className="nav-link"><span data-key="t-landing">Stock</span></Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarUI"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarUI"
              >
                <i className="ri-pencil-ruler-2-line" />{" "}
                <span data-key="t-base-ui">Invoice</span>
              </a>
              <div
                className="collapse menu-dropdown mega-dropdown-menu"
                id="sidebarUI"
              >
                <div className="row">
                  <div className="col-lg-4">
                    <ul className="nav nav-sm flex-column">
                      <li className="nav-item">
                        <Link to="/InvoiceMaster" className="nav-link"><span data-key="t-landing">Stock</span></Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarAdvanceUI"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarAdvanceUI"
              >
                <i className="ri-stack-line" />{" "}
                <span data-key="t-advance-ui">Advance UI</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarAdvanceUI">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a
                      href="advance-ui-sweetalerts.html"
                      className="nav-link"
                      data-key="t-sweet-alerts"
                    >
                      Sweet Alerts
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="advance-ui-nestable.html"
                      className="nav-link"
                      data-key="t-nestable-list"
                    >
                      Nestable List
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="advance-ui-scrollbar.html"
                      className="nav-link"
                      data-key="t-scrollbar"
                    >
                      Scrollbar
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="advance-ui-animation.html"
                      className="nav-link"
                      data-key="t-animation"
                    >
                      Animation
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="advance-ui-tour.html"
                      className="nav-link"
                      data-key="t-tour"
                    >
                      Tour
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="advance-ui-swiper.html"
                      className="nav-link"
                      data-key="t-swiper-slider"
                    >
                      Swiper Slider
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="advance-ui-ratings.html"
                      className="nav-link"
                      data-key="t-ratings"
                    >
                      Ratings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="advance-ui-highlight.html"
                      className="nav-link"
                      data-key="t-highlight"
                    >
                      Highlight
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="advance-ui-scrollspy.html"
                      className="nav-link"
                      data-key="t-scrollSpy"
                    >
                      ScrollSpy
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-link" href="widgets.html">
                <i className="ri-honour-line" />{" "}
                <span data-key="t-widgets">Widgets</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarForms"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarForms"
              >
                <i className="ri-file-list-3-line" />{" "}
                <span data-key="t-forms">Forms</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarForms">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a
                      href="forms-elements.html"
                      className="nav-link"
                      data-key="t-basic-elements"
                    >
                      Basic Elements
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-select.html"
                      className="nav-link"
                      data-key="t-form-select"
                    >
                      {" "}
                      Form Select{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-checkboxs-radios.html"
                      className="nav-link"
                      data-key="t-checkboxs-radios"
                    >
                      Checkboxs &amp; Radios
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-pickers.html"
                      className="nav-link"
                      data-key="t-pickers"
                    >
                      {" "}
                      Pickers{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-masks.html"
                      className="nav-link"
                      data-key="t-input-masks"
                    >
                      Input Masks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-advanced.html"
                      className="nav-link"
                      data-key="t-advanced"
                    >
                      Advanced
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-range-sliders.html"
                      className="nav-link"
                      data-key="t-range-slider"
                    >
                      {" "}
                      Range Slider{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-validation.html"
                      className="nav-link"
                      data-key="t-validation"
                    >
                      Validation
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-wizard.html"
                      className="nav-link"
                      data-key="t-wizard"
                    >
                      Wizard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-editors.html"
                      className="nav-link"
                      data-key="t-editors"
                    >
                      Editors
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-file-uploads.html"
                      className="nav-link"
                      data-key="t-file-uploads"
                    >
                      File Uploads
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-layouts.html"
                      className="nav-link"
                      data-key="t-form-layouts"
                    >
                      Form Layouts
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="forms-select2.html"
                      className="nav-link"
                      data-key="t-select2"
                    >
                      Select2
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarTables"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarTables"
              >
                <i className="ri-layout-grid-line" />{" "}
                <span data-key="t-tables">Tables</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarTables">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a
                      href="tables-basic.html"
                      className="nav-link"
                      data-key="t-basic-tables"
                    >
                      Basic Tables
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="tables-gridjs.html"
                      className="nav-link"
                      data-key="t-grid-js"
                    >
                      Grid Js
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="tables-listjs.html"
                      className="nav-link"
                      data-key="t-list-js"
                    >
                      List Js
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="tables-datatables.html"
                      className="nav-link"
                      data-key="t-datatables"
                    >
                      Datatables
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarCharts"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarCharts"
              >
                <i className="ri-pie-chart-line" />{" "}
                <span data-key="t-charts">Charts</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarCharts">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a
                      href="#sidebarApexcharts"
                      className="nav-link"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarApexcharts"
                      data-key="t-apexcharts"
                    >
                      Apexcharts
                    </a>
                    <div
                      className="collapse menu-dropdown"
                      id="sidebarApexcharts"
                    >
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            href="charts-apex-line.html"
                            className="nav-link"
                            data-key="t-line"
                          >
                            {" "}
                            Line
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-area.html"
                            className="nav-link"
                            data-key="t-area"
                          >
                            {" "}
                            Area
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-column.html"
                            className="nav-link"
                            data-key="t-column"
                          >
                            Column{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-bar.html"
                            className="nav-link"
                            data-key="t-bar"
                          >
                            {" "}
                            Bar{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-mixed.html"
                            className="nav-link"
                            data-key="t-mixed"
                          >
                            {" "}
                            Mixed
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-timeline.html"
                            className="nav-link"
                            data-key="t-timeline"
                          >
                            Timeline{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-range-area.html"
                            className="nav-link"
                            data-key="t-range-area"
                          >
                            Range Area
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-funnel.html"
                            className="nav-link"
                            data-key="t-funnel"
                          >
                            Funnel
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-candlestick.html"
                            className="nav-link"
                            data-key="t-candlstick"
                          >
                            {" "}
                            Candlstick{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-boxplot.html"
                            className="nav-link"
                            data-key="t-boxplot"
                          >
                            Boxplot{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-bubble.html"
                            className="nav-link"
                            data-key="t-bubble"
                          >
                            Bubble{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-scatter.html"
                            className="nav-link"
                            data-key="t-scatter"
                          >
                            Scatter{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-heatmap.html"
                            className="nav-link"
                            data-key="t-heatmap"
                          >
                            Heatmap{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-treemap.html"
                            className="nav-link"
                            data-key="t-treemap"
                          >
                            Treemap{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-pie.html"
                            className="nav-link"
                            data-key="t-pie"
                          >
                            {" "}
                            Pie{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-radialbar.html"
                            className="nav-link"
                            data-key="t-radialbar"
                          >
                            {" "}
                            Radialbar{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-radar.html"
                            className="nav-link"
                            data-key="t-radar"
                          >
                            {" "}
                            Radar
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="charts-apex-polar.html"
                            className="nav-link"
                            data-key="t-polar-area"
                          >
                            Polar Area{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="charts-apex-slope.html" className="nav-link">
                            <span data-key="t-slope">Slope</span>{" "}
                            <span
                              className="badge badge-pill bg-success"
                              data-key="t-new"
                            >
                              New
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      href="charts-chartjs.html"
                      className="nav-link"
                      data-key="t-chartjs"
                    >
                      {" "}
                      Chartjs{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="charts-echarts.html"
                      className="nav-link"
                      data-key="t-echarts"
                    >
                      {" "}
                      Echarts{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarIcons"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarIcons"
              >
                <i className="ri-compasses-2-line" />{" "}
                <span data-key="t-icons">Icons</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarIcons">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a href="icons-remix.html" className="nav-link">
                      <span data-key="t-remix">Remix</span>{" "}
                      <span className="badge badge-pill bg-info">v4.3</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="icons-boxicons.html" className="nav-link">
                      <span data-key="t-boxicons">Boxicons</span>{" "}
                      <span className="badge badge-pill bg-info">v2.1.4</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="icons-materialdesign.html" className="nav-link">
                      <span data-key="t-material-design">Material Design</span>{" "}
                      <span className="badge badge-pill bg-info">v7.2.96</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="icons-lineawesome.html"
                      className="nav-link"
                      data-key="t-line-awesome"
                    >
                      Line Awesome
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="icons-feather.html" className="nav-link">
                      <span data-key="t-feather">Feather</span>{" "}
                      <span className="badge badge-pill bg-info">v4.29.2</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="icons-crypto.html" className="nav-link">
                      {" "}
                      <span data-key="t-crypto-svg">Crypto SVG</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarMaps"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarMaps"
              >
                <i className="ri-map-pin-line" />{" "}
                <span data-key="t-maps">Maps</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarMaps">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a
                      href="maps-google.html"
                      className="nav-link"
                      data-key="t-google"
                    >
                      Google
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="maps-vector.html"
                      className="nav-link"
                      data-key="t-vector"
                    >
                      Vector
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="maps-leaflet.html"
                      className="nav-link"
                      data-key="t-leaflet"
                    >
                      Leaflet
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarMultilevel"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarMultilevel"
              >
                <i className="ri-share-line" />{" "}
                <span data-key="t-multi-level">Multi Level</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarMultilevel">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a href="#" className="nav-link" data-key="t-level-1.1">
                      {" "}
                      Level 1.1{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#sidebarAccount"
                      className="nav-link"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      aria-controls="sidebarAccount"
                      data-key="t-level-1.2"
                    >
                      {" "}
                      Level 1.2
                    </a>
                    <div className="collapse menu-dropdown" id="sidebarAccount">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            href="#"
                            className="nav-link"
                            data-key="t-level-2.1"
                          >
                            {" "}
                            Level 2.1{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#sidebarCrm"
                            className="nav-link"
                            data-bs-toggle="collapse"
                            role="button"
                            aria-expanded="false"
                            aria-controls="sidebarCrm"
                            data-key="t-level-2.2"
                          >
                            {" "}
                            Level 2.2
                          </a>
                          <div
                            className="collapse menu-dropdown"
                            id="sidebarCrm"
                          >
                            <ul className="nav nav-sm flex-column">
                              <li className="nav-item">
                                <a
                                  href="#"
                                  className="nav-link"
                                  data-key="t-level-3.1"
                                >
                                  {" "}
                                  Level 3.1
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="#"
                                  className="nav-link"
                                  data-key="t-level-3.2"
                                >
                                  {" "}
                                  Level 3.2
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        {/* Sidebar */}
      </div>
      <div className="sidebar-background" />
    </div>
  );
}