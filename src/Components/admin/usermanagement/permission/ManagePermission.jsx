import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axiosConfig"; // Replace with your axios config
import notification from "../../../../services/toastService"; // For notifications
import { ProgressSpinner } from 'primereact/progressspinner';



import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme CSS
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icon CSS
 
const ManagePermission = () => {
  const [permissions, setPermissions] = useState([]);
  const [filters, setFilters] = useState([]);
  const [header, setHeader] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch permissions on component mount
  useEffect(() => {
    axiosInstance
      .get("/permission/getall") // Replace with the correct API endpoint
      .then((response) => {
        setPermissions(response.data.data); // Assuming data is in 'data'
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching permissions:", error);
        setLoading(false);
      });
  }, []);

  // Handle delete permission
  const handleDelete = (permissionId) => {
    if (window.confirm("Are you sure you want to delete this permission?")) {
      setLoading(true)
      axiosInstance
        .post(`/permission/delete/${permissionId}`)
        .then((response) => {
          setLoading(false)
          setPermissions(permissions.filter((permission) => permission.id !== permissionId));
          notification(response.data.message || "Permission deleted successfully!", "success");
        })
        .catch((error) => {
          setLoading(false)
          notification("Error deleting permission", "error");
        });
    }
  };

  // Handle edit permission
  const handleEdit = (permissionId) => {
    navigate(`/admin/permission/edit/${permissionId}`);
  };

  // Custom search functionality
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div id="main">
      {/* <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3" />
        </a>
      </header> */}
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Permissions</h3>
              <p className="text-subtitle text-muted">List of user permissions</p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Permissions
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="card">
            <div className="card-header  ">
              <h5>Manage Permissions</h5>
              <button className="btn btn-primary float-end " onClick={(e) => navigate('/admin/permission/create')}>Add Permission</button>
              <div className="p-inputgroup">
                {/* <InputText
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search Permissions"
                  className="w-full"
                /> */}
             
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center">
               <ProgressSpinner  style={{width: '30px', height: '30px'}} aria-label="Loading" />

                </div>
              ) : (

                <DataTable value={permissions.filter((permission) =>
                  permission.name.toLowerCase().includes(searchTerm.toLowerCase())
                )} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                      globalFilterFields={['name' ]} header={header} emptyMessage="No permission found.">
                  <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                  <Column
                    header="Actions"
                    body={(rowData) => (
                      <div className="d-flex gap-2">
                        <Button
                          label="Edit"
                          icon="pi pi-pencil"
                          className="p-button-rounded p-button-warning"
                          onClick={() => handleEdit(rowData.id)}
                        />
                        <Button
                          label={(loading) ? 'Deleting...' : 'Delete'}
                          icon="pi pi-trash"
                          className="p-button-rounded p-button-danger"
                          onClick={() => handleDelete(rowData.id)}
                        />
                      </div>
                    )}
                  />
              </DataTable>

                
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManagePermission;
