
import Footer from "./Footer";
import Navbar from "./Navbar";
import Settings from "./Settings";
import Sidebar from "./Sidebar";
export default function Home() {
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Settings />
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Striped Table</h4>
                    <p className="card-description">Add class</p>

                    <div className="row">
                      <div className="col-md-12">
                        {/* Content Start From here */}


                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
