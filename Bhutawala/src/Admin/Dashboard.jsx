
import React from 'react'

export default function Dashboard() {
  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-md-6">
          {/* card */}
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    {" "}
                    Total Earnings
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-success fs-14 mb-0">
                    <i className="ri-arrow-right-up-line fs-13 align-middle" />{" "}
                    +16.24 %
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    $
                    <span
                      className="counter-value"
                      data-target="559.25"
                    >
                      0
                    </span>
                    k{" "}
                  </h4>
                  <a href="" className="text-decoration-underline">
                    View net earnings
                  </a>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-success-subtle rounded fs-3">
                    <i className="bx bx-dollar-circle text-success" />
                  </span>
                </div>
              </div>
            </div>
            {/* end card body */}
          </div>
          {/* end card */}
        </div>
        <div className="col-xl-3 col-md-6">
          {/* card */}
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Orders
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-danger fs-14 mb-0">
                    <i className="ri-arrow-right-down-line fs-13 align-middle" />{" "}
                    -3.57 %
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value" data-target={36894}>
                      0
                    </span>
                  </h4>
                  <a href="" className="text-decoration-underline">
                    View all orders
                  </a>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-info-subtle rounded fs-3">
                    <i className="bx bx-shopping-bag text-info" />
                  </span>
                </div>
              </div>
            </div>
            {/* end card body */}
          </div>
          {/* end card */}
        </div>
        <div className="col-xl-3 col-md-6">
          {/* card */}
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Customers
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-success fs-14 mb-0">
                    <i className="ri-arrow-right-up-line fs-13 align-middle" />{" "}
                    +29.08 %
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target="183.35"
                    >
                      0
                    </span>
                    M{" "}
                  </h4>
                  <a href="" className="text-decoration-underline">
                    See details
                  </a>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-warning-subtle rounded fs-3">
                    <i className="bx bx-user-circle text-warning" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          {/* card */}
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    {" "}
                    My Balance
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-muted fs-14 mb-0">+0.00 %</h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    $
                    <span
                      className="counter-value"
                      data-target="165.89"
                    >
                      0
                    </span>
                    k{" "}
                  </h4>
                  <a href="" className="text-decoration-underline">
                    Withdraw money
                  </a>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-primary-subtle rounded fs-3">
                    <i className="bx bx-wallet text-primary" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card">
            <div className="card-header border-0 align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">Revenue</h4>
              <div>
                <button
                  type="button"
                  className="btn btn-soft-secondary material-shadow-none btn-sm"
                >
                  ALL
                </button>
                <button
                  type="button"
                  className="btn btn-soft-secondary material-shadow-none btn-sm"
                >
                  1M
                </button>
                <button
                  type="button"
                  className="btn btn-soft-secondary material-shadow-none btn-sm"
                >
                  6M
                </button>
                <button
                  type="button"
                  className="btn btn-soft-primary material-shadow-none btn-sm"
                >
                  1Y
                </button>
              </div>
            </div>
            {/* end card header */}
            <div className="card-header p-0 border-0 bg-light-subtle">
              <div className="row g-0 text-center">
                <div className="col-6 col-sm-3">
                  <div className="p-3 border border-dashed border-start-0">
                    <h5 className="mb-1">
                      <span
                        className="counter-value"
                        data-target={7585}
                      >
                        0
                      </span>
                    </h5>
                    <p className="text-muted mb-0">Orders</p>
                  </div>
                </div>
                {/*end col*/}
                <div className="col-6 col-sm-3">
                  <div className="p-3 border border-dashed border-start-0">
                    <h5 className="mb-1">
                      $
                      <span
                        className="counter-value"
                        data-target="22.89"
                      >
                        0
                      </span>
                      k
                    </h5>
                    <p className="text-muted mb-0">Earnings</p>
                  </div>
                </div>
                {/*end col*/}
                <div className="col-6 col-sm-3">
                  <div className="p-3 border border-dashed border-start-0">
                    <h5 className="mb-1">
                      <span className="counter-value" data-target={367}>
                        0
                      </span>
                    </h5>
                    <p className="text-muted mb-0">Refunds</p>
                  </div>
                </div>
                {/*end col*/}
                <div className="col-6 col-sm-3">
                  <div className="p-3 border border-dashed border-start-0 border-end-0">
                    <h5 className="mb-1 text-success">
                      <span
                        className="counter-value"
                        data-target="18.92"
                      >
                        0
                      </span>
                      %
                    </h5>
                    <p className="text-muted mb-0">
                      Conversation Ratio
                    </p>
                  </div>
                </div>
                {/*end col*/}
              </div>
            </div>
            {/* end card header */}
            <div className="card-body p-0 pb-2">
              <div className="w-100">
                <div
                  id="customer_impression_charts"
                  data-colors='["--vz-primary", "--vz-success", "--vz-danger"]'
                  data-colors-minimal='["--vz-light", "--vz-primary", "--vz-info"]'
                  data-colors-saas='["--vz-success", "--vz-info", "--vz-danger"]'
                  data-colors-modern='["--vz-warning", "--vz-primary", "--vz-success"]'
                  data-colors-interactive='["--vz-info", "--vz-primary", "--vz-danger"]'
                  data-colors-creative='["--vz-warning", "--vz-primary", "--vz-danger"]'
                  data-colors-corporate='["--vz-light", "--vz-primary", "--vz-secondary"]'
                  data-colors-galaxy='["--vz-secondary", "--vz-primary", "--vz-primary-rgb, 0.50"]'
                  data-colors-classic='["--vz-light", "--vz-primary", "--vz-secondary"]'
                  data-colors-vintage='["--vz-success", "--vz-primary", "--vz-secondary"]'
                  className="apex-charts"
                  dir="ltr"
                />
              </div>
            </div>
            {/* end card body */}
          </div>
          {/* end card */}
        </div>
      </div>
    </>
  )
}
