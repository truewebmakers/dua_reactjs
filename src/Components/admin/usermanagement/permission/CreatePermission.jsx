import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axiosInstance from "../../../../axiosConfig";
import notification from "../../../../services/toastService";

const CreatePermission = () => {
  const [permissionName, setPermissionName] = useState(""); // state for permission name
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();  

  useEffect(() => {
    if (id) {
      // Only fetch data if `id` exists (for edit mode)
      setIsLoading(true);
      axiosInstance
        .get(`/permission/get/${id}`)
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

    // Validate permission name
    if (!permissionName) {
      notification("Permission name is required", "error");
      setIsLoading(false);
      return;
    }

    const url = id ? `/permission/update/${id}` : `/permission/store`; // URL changes for create/edit
    try {
      const res = await axiosInstance.post(url, {
        name: permissionName,
      });

      if (res.data && res.data.success) {
        notification(
          res.data.message || "Permission saved successfully",
          "success"
        );
        setIsLoading(false);
        navigate("/admin/permission/list"); // Redirect after success
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

  // Handle form field changes
  const handleChange = (e) => {
    setPermissionName(e.target.value); // Directly update the state for permission name
  };

  return (
    <div id="main">
      <div className="page-heading">
        <h1>{id ? "Update" : "Create"} Permission</h1>
        <section id="basic-vertical-layouts">
          <div className="row match-height">
            <div className="col-md-12 col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">
                    {id ? "Update" : "Create"} Permission
                  </h4>
                </div>
                <div className="card-content">
                  <div className="card-body">
                    <form
                      className="form form-vertical"
                      onSubmit={handleSubmit}
                    >
                      <div className="form-body">
                        <div className="row">
                          <div className="col-md-6 col-12">
                            <div className="form-group has-icon-left">
                              <label htmlFor="permission-name">
                                Permission Name
                              </label>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  id="permission-name"
                                  className="form-control"
                                  value={permissionName}
                                  onChange={handleChange}
                                  placeholder="Enter permission name"
                                  disabled={isLoading}
                                />
                                <div className="form-control-icon">
                                  <i className="bi bi-lock" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 d-flex justify-content-end">
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mb-1"
                              disabled={isLoading}
                            >
                              {isLoading
                                ? id
                                  ? "Updating..."
                                  : "Creating..."
                                : id
                                ? "Update Permission"
                                : "Create Permission"}
                            </button>

                            <button
                              type="reset"
                              className="btn btn-light-secondary me-1 mb-1"
                              disabled={isLoading}
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
