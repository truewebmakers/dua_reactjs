import React, { useState, useEffect } from "react";
import Breadcrumb from "../../Breadcrumb";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosConfig"; // Replace with your axios config
import notification from "../../../services/toastService"; // For notifications
import { ProgressSpinner } from "primereact/progressspinner";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme CSS
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icon CSS

const VenueList = () => {
  const [permissions, setPermissions] = useState([]);
  const [filters, setFilters] = useState({
    status: { value: null },
    venue_id: { value: null },
    city: { value: null },
    siteadmin_id: { value: null },
    address: { value: null },
    venue_date: { value: null }
  });
  const [header, setHeader] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();

  // Fetch permissions on component mount
  useEffect(() => {
    axiosInstance
      .get("/venue/getall") // Replace with the correct API endpoint
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
      setLoading(true);
      axiosInstance
        .post(`/venue/delete/${permissionId}`)
        .then((response) => {
          setLoading(false);
          setPermissions(
            permissions.filter((permission) => permission.id !== permissionId)
          );
          notification(
            response.data.message || "Permission deleted successfully!",
            "success"
          );
        })
        .catch((error) => {
          setLoading(false);
          notification("Error deleting permission", "error");
        });
    }
  };

  // Handle edit permission
  const handleEdit = (permissionId) => {
    navigate(`/venue/permission/edit/${permissionId}`);
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  // Custom header for the DataTable with search input
  const renderHeader = () => {
    return (
      <div className="table-header">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-inputtext p-component"
            placeholder="Global Search"
          />
        </span>
      </div>
    );
  };

  return (
    <div id="main">
      <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3" />
        </a>
      </header>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Venue List</h3>
              <p className="text-subtitle text-muted">
                For user to check their venue list
              </p>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav
                aria-label="breadcrumb"
                className="breadcrumb-header float-start float-lg-end"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Venue List
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <section className="section">
          <div className="card-body">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <ProgressSpinner
                  style={{ width: "30px", height: "30px" }}
                  aria-label="Loading"
                />
              </div>
            ) : (

              <DataTable 
              value={permissions} 
              paginator rows={10} 
              dataKey="id"
              filters={filters} 
              filterDisplay="row" 
              loading={loading}
              globalFilterFields={['status', 'venue_id', 'city', 'siteadmin_id' ,'address','venue_date']} 
              header={header} emptyMessage="No customers found.">
 
                <Column
                  field="status"
                  filterField="status"
                  header="Status"
                  filter
                  filterPlaceholder="Search by status"
                  style={{ minWidth: "18rem" }}
                />
                <Column
                  field="venue_id"
                  header="Country Name"
                  filter
                  filterPlaceholder="Search by Country"
                  style={{ minWidth: "18rem" }}
                />
                <Column
                  field="city"
                  header="City"
                  filter
                  filterPlaceholder="Search by City"
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  field="siteadmin_id"
                  header="Site Admin"
                  filter
                  filterPlaceholder="Search by Admin"
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  field="address"
                  header="Address"
                  filter
                  filterPlaceholder="Search by Address"
                  style={{ minWidth: "16rem" }}
                />
                <Column
                  field="venue_date"
                  header="Venue Detail"
                  filter
                  filterPlaceholder="Search by Venue Date"
                  style={{ minWidth: "12rem" }}
                />
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
                        label={loading ? "Deleting..." : "Delete"}
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
        </section>
      </div>
    </div>
  );
};

export default VenueList;
