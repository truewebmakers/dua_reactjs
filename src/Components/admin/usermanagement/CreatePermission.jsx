import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import notification from "../../../services/toastService";

const CreatePermission = () => {
  const [permissionName, setPermissionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true);

    // Validation: Ensure permission name is provided
    if (!permissionName) {
      notification("Permission name is required", "error");
      setIsLoading(false);
      return;
    }

    try {
      // Send API request to create a new permission
      const res = await axiosInstance.post("permission/store", {
        name: permissionName,
      });

      if (res.data && res.data.success) {
        // Success: Show notification and navigate to permission list
        notification(res.message || "Permission created successfully", "success");
        setIsLoading(false);
        navigate("/admin/permissions/list");
      } else {
        // Handle failure response
        notification(res.message || "Failed to create permission", "error");
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
        <h1>Create Permission</h1>
        <section id="basic-vertical-layouts">
          <div className="row match-height">
            <div className="col-md-12 col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Create Permission</h4>
                </div>
                <div className="card-content">
                  <div className="card-body">
                    <form className="form form-vertical" onSubmit={handleSubmit}>
                      <div className="form-body">
                        <div className="row">
                          <div className="col-md-6 col-12">
                            <div className="form-group has-icon-left">
                              <label htmlFor="permission-name">Permission Name</label>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  id="permission-name"
                                  className="form-control"
                                  value={permissionName}
                                  onChange={(e) => setPermissionName(e.target.value)}
                                  placeholder="Enter permission name"
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
                              {isLoading ? "Creating..." : "Create Permission"}
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
