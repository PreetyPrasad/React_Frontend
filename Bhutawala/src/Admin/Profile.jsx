import React from 'react'

export default function Profile() {
  return (
    <>
      <div className="profile-foreground position-relative mx-n4 mt-n4">
        <div className="profile-wid-bg">
          <img
            src="assets/images/profile-bg.jpg"
            alt=""
            className="profile-wid-img"
          />
        </div>
      </div>
      <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
        <div className="row g-4">
          <div className="col-auto">
            <div className="avatar-lg">
              <img
                src="/assets/images/Bhutawala_images/BT-logo.png"
                alt="user-img"
                className="img-thumbnail rounded-circle"
              />
            </div>
          </div>
          {/*end col*/}
          <div className="col">
            <div className="p-2">
              <h3 className="text-white mb-1">Lukman Bhuta</h3>
              <p className="text-white text-opacity-75">Owner &amp; Founder</p>
              <div className="hstack text-white-50 gap-1">
                <div className="me-2">
                  <i className="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle" />
                  Tankaria, Bharuch - 392240
                </div>
                {/* <div>
                  <i className="ri-building-line me-1 text-white text-opacity-75 fs-16 align-middle" />
                  Themesbrand
                </div> */}
              </div>
            </div>
          </div>
          {/*end col*/}
          <div className="col-12 col-lg-auto order-last order-lg-0">
            <div className="row text text-white-50 text-center">
              <div className="col-lg-6 col-4">
                <div className="p-2">
                  <h4 className="text-white mb-1">24.3K</h4>
                  <p className="fs-14 mb-0">Followers</p>
                </div>
              </div>
              <div className="col-lg-6 col-4">
                <div className="p-2">
                  <h4 className="text-white mb-1">1.3K</h4>
                  <p className="fs-14 mb-0">Following</p>
                </div>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div>
            <div className="d-flex profile-wrapper">
              {/* Nav tabs */}
              <ul
                className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link fs-14 active"
                    data-bs-toggle="tab"
                    href="#overview-tab"
                    role="tab"
                    aria-selected="true"
                  >
                    <i className="ri-airplay-fill d-inline-block d-md-none" />{" "}
                    <span className="d-none d-md-inline-block">Overview</span>
                  </a>
                </li>
              </ul>
              {/* <div className="flex-shrink-0">
                <a href="pages-profile-settings.html" className="btn btn-success">
                  <i className="ri-edit-box-line align-bottom" /> Edit Profile
                </a>
              </div> */}
            </div>
            {/* Tab panes */}
            <div className="tab-content pt-4 text-muted">
              <div className="tab-pane active" id="overview-tab" role="tabpanel">
                <div className="row">
                  <div className="col-xxl-3">
                   
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title mb-3">Info</h5>
                        <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Full Name :
                                </th>
                                <td className="text-muted">Lukman Bhuta</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Mobile :
                                </th>
                                <td className="text-muted">97378 28202</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  E-mail :
                                </th>
                                <td className="text-muted">bhutawalatraders@gmail.com</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Location :
                                </th>
                                <td className="text-muted">
                                Tankaria, Bharuch - 392240
                                </td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Joining Date
                                </th>
                                <td className="text-muted">24 Nov 2021</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* end card body */}
                    </div>
                    {/* end card */}
                  </div>
                  {/*end col*/}
                  <div className="col-xxl-9">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title mb-3">About</h5>
                        <p>
                        Bhutawala Traders in Tankaria, Bharuch is known to satisfactorily cater to the demands of its customer base. It stands located at Tankaria-392240.The business strives to make for a positive experience through its offerings. 
                        </p>
                        <p>
                        Customer centricity is at the core of Bhutawala Traders in Tankaria, Bharuch and it is this belief that has led the business to build long-term relationships. Ensuring a positive customer experience, making available goods and/or services that are of top-notch quality is given prime importance.
                        </p>
                        <p>India’s leading B2B market place, Jd Mart ensures engaging in business activities is a seamless process for small and medium enterprises as well as large businesses. In a wake to enable these businesses to reach their audience, this portal lets them showcase their offerings in terms of the products and/or services through a digital catalogue. This business has a wide range of product offerings and the product/catalogue list includes Building Material etc.</p>
                        <div className="row">
                          {/*end col*/}
                          <div className="col-6 col-md-4">
                            <div className="d-flex mt-4">
                              <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                <div className="avatar-title bg-light rounded-circle fs-16 text-primary material-shadow">
                                  <i className="ri-global-line" />
                                </div>
                              </div>
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="mb-1">Website :</p>
                                <a href="#" className="fw-semibold">
                                  www.BhutawalaTraders.com
                                </a>
                              </div>
                            </div>
                          </div>
                          {/*end col*/}
                        </div>
                        {/*end row*/}
                      </div>
                      {/*end card-body*/}
                    </div>
                    {/* end card */}
                  </div>
                  {/*end col*/}
                </div>
                {/*end row*/}
              </div>
              {/*end tab-pane*/}
              
              {/*end tab-pane*/}
            </div>
            {/*end tab-content*/}
          </div>
        </div>
        {/*end col*/}
      </div>
    </>
  )
}
