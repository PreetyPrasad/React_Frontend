import React from "react";

export default function Breadcrumbs(props) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
          <h4 className="mb-sm-0">{props.Title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item">
                <a href="javascript: void(0);">Home</a>
              </li>
              <li className="breadcrumb-item active">{props.Title}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
