import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";

import axiosInstance from "../../../../axiosConfig";
import notification from "../../../../services/toastService";

const CreateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    profile_pic: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("id",id)
    if (id) {
      // Only fetch data if `id` exists (for edit mode)
      setIsLoading(true);
      axiosInstance
        .get(`/user/get/${id}`)
        .then((response) => {
          const res = response.data.data;
          setPermissionName(res.name); // Set permission name from fetched data
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          notification("Error fetching permission data", "error");
        });
    }
  }, [id]); // Only run this effect when `id` changes

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);

    const url = id ? `/user/update/${id}` : `/user/store`; // URL changes for create/edit
    try {
      const res = await axiosInstance.post(url, formData);

      if (res.data && res.data.success) {
        notification(res.data.message || "User saved successfully", "success");
        setIsLoading(false);
        navigate("/admin/user/list"); // Redirect after success
      } else {
        notification(res.data.message || "Failed to save permission", "error");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      let errors = err.response?.data || {};
      if (errors.message) {
        notification(errors.message, "error");
      } else {
        notification("An error occurred, please try again later.", "error");
      }
    }
  };

  return (
    <div id="main">
      <div className="page-heading">
        <section id="basic-vertical-layouts">
          <div className="row match-height">
            <Breadcrumb
              title="Create User"
              subheading="This is for creating User"
            />
            <div className="col-md-12 col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Add User</h4>
                </div>
                <div className="card-content">
                  <div className="card-body">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group has-icon-left">
                            <label htmlFor="first-name-icon">Name</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                onChange={handleInputChange}
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
                                name="email"
                                onChange={handleInputChange}
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
                            <label htmlFor="password-id-icon">Password</label>
                            <div className="position-relative">
                              <input
                                type="password"
                                name="password"
                                onChange={handleInputChange}
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
                          <div className="form-group has-icon-left">
                            <label htmlFor="password-id-icon">
                              Confirm Password
                            </label>
                            <div className="position-relative">
                              <input
                                type="password"
                                name="confirm_password"
                                onChange={handleInputChange}
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
                          <div className="form-group has-icon-left">
                            <label htmlFor="first-name-icon">
                              Choose Field Admin
                            </label>
                            <select
                              className="form-select"
                              name="role"
                              onChange={handleInputChange}
                              id="basicSelect"
                            >
                              <option value="admin">admin</option>
                              <option value="site-admin">site-admin</option>
                              <option value="therapist">therapist</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6 col-12">
                          <div className="form-group has- -left">
                            <label htmlFor="first-name-icon">
                              Upload Profile Picture
                            </label>

                            <div className="position-relative">
                              <input
                                type="file"
                                name="profile_pic"
                                className="form-control"
                                onChange={handleInputChange}
                                placeholder="Password"
                                id="file-id-icon"
                              />
                            </div>
                          </div>
                        </div> 

                        <div className="col-12 d-flex justify-content-end">
                          {(id==undefined) ? (
                            <button
                              type="submit"
                              disabled={isLoading}
                              className="btn btn-primary me-1 mb-1"
                              onClick={(e) => handleSubmit(e)}
                            >
                               {(isLoading) ? 'Saving...' : 'Save'}
                               
                            </button>
                          ) : (
                            <button
                              type="submit"
                              disabled={isLoading}
                              className="btn btn-primary me-1 mb-1"
                              onClick={(e) => handleSubmit(e)}
                            > {(isLoading) ? 'updating...' : 'Update'}
                            </button>
                          )}

                          <button
                            type="reset"
                            className="btn btn-light-secondary me-1 mb-1"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
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

export default CreateUser;
