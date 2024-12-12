import React from "react";
import Breadcrumb from "../../Breadcrumb";

const CreatePermission = () => {
  return (
    <div id="main">
      <div className="page-heading">
        
        <section id="basic-vertical-layouts">
          <div className="row match-height">
            <Breadcrumb title="Craete Permission" subheading="This is for creating Permission"/>
            <div className="col-md-12 col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Vertical Form with Icons</h4>
                </div>
                <div className="card-content">
                  <div className="card-body">
                    <form className="form form-vertical">
                      <div className="form-body">
                        <div className="row">
                          <div className="col-md-6 col-12">
                            <div className="form-group has-icon-left">
                              <label htmlFor="first-name-icon">
                                First Name
                              </label>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Input with icon left"
                                  id="first-name-icon"
                                />
                                <div className="form-control-icon">
                                  <i className="bi bi-person" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="form-group has-icon-left">
                              <label htmlFor="email-id-icon">Email</label>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Email"
                                  id="email-id-icon"
                                />
                                <div className="form-control-icon">
                                  <i className="bi bi-envelope" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="form-group has-icon-left">
                              <label htmlFor="mobile-id-icon">Mobile</label>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Mobile"
                                  id="mobile-id-icon"
                                />
                                <div className="form-control-icon">
                                  <i className="bi bi-phone" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="form-group has-icon-left">
                              <label htmlFor="password-id-icon">Password</label>
                              <div className="position-relative">
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Password"
                                  id="password-id-icon"
                                />
                                <div className="form-control-icon">
                                  <i className="bi bi-lock" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="form-check">
                              <div className="checkbox mt-2">
                                <input
                                  type="checkbox"
                                  id="remember-me-v"
                                  className="form-check-input"
                                  defaultChecked
                                />
                                <label htmlFor="remember-me-v">
                                  Remember Me
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 d-flex justify-content-end">
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mb-1"
                            >
                              Submit
                            </button>
                            <button
                              type="reset"
                              className="btn btn-light-secondary me-1 mb-1"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       
      </div>
    </div>
  );
};

export default CreatePermission;
