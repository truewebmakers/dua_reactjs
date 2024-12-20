import React,{useState,useEffect } from 'react';
import Breadcrumb from "../../../Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";

import axiosInstance from "../../../../axiosConfig";
import notification from "../../../../services/toastService";

const CreateRole = () => {

  const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [permissionList, setPermissionList] = useState([]);
    const [formData, setFormData] = useState({
      name: "",permission:[]
    });

    useEffect(() => {
     
        // Only fetch data if `id` exists (for edit mode)
        setIsLoading(true);
        axiosInstance
          .get(`/permission/getall`)
          .then((response) => {
            const res = response.data.data;
            setPermissionList(res)
             
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            notification("Error fetching permission data", "error");
          });
      
    }, [id]);  
 
    const handleInputChange = (e) => {
      const { name, value, checked } = e.target;
      // Handle checkbox logic for 'permission' array
      if (name === "permission[]") {
        if (checked) {
          setFormData((prevData) => ({
            ...prevData,
            permission: [...prevData.permission, value],
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            permission: prevData.permission.filter((item) => item !== value),
          }));
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };

    
    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    //   }));
    // }; 

    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      setIsLoading(true);
  
      const url = id ? `/role/update/${id}` : `/role/store`; // URL changes for create/edit
      try {
        const res = await axiosInstance.post(url, formData);
  
        if (res.data && res.data.success) {
          notification(res.data.message || "User saved successfully", "success");
          setIsLoading(false);
          navigate("/admin/role/list"); // Redirect after success
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
          <Breadcrumb title="Create Role" subheading="This is for creating Permission"/>
          <div className="col-md-12 col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Role</h4>
              </div>
              <div className="card-content">
                <div className="card-body">
                  <form className="form form-vertical">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group has-icon-left">
                            <label htmlFor="first-name-icon">
                                Name
                            </label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Role name"
                                id="first-name-icon"
                                name='name'
                                onChange={handleInputChange}
                              />
                              <div className="form-control-icon">
                                <i className="bi bi-person" />
                              </div>
                            </div>
                          </div>
                        </div>
                       
                      
                        <div className="col-md-6 col-12">
                        <label htmlFor="first-name-icon">
                                Permissions
                            </label>
                          <div className="form-check">

                          {Object.values(permissionList).map((permission) => (
                           
                              <div className="checkbox mt-2" key={permission.id}>
                                <input
                                  type="checkbox"
                                  name={`permission[]`}
                                  value={permission.id} 
                                  id={`permission-${permission.id}`} // Use dynamic ID based on permission ID
                                  className="form-check-input"
                                  onChange={handleInputChange} 
                                />
                                <label htmlFor={`permission-${permission.id}`}>{permission.name}</label>
                              </div>
                            ))}




                           
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
}

export default CreateRole;
