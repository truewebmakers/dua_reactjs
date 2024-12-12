import React from 'react';

const Breadcrumb = (pros) => {
  return (
    <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>{pros.title}</h3>
              <p className="text-subtitle text-muted">
              {pros.subheading}
              </p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav
                aria-label="breadcrumb"
                className="breadcrumb-header float-start float-lg-end"
              >
                {/* <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Form Layout
                  </li>
                </ol> */}
              </nav>
            </div>
          </div>
        </div> 
  );
}

export default Breadcrumb;
