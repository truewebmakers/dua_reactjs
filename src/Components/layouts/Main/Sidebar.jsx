import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import notification from "../../../services/toastService";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authInfo");
    notification("You have been logged out successfully!", "success");
    navigate("/auth/login");
  };
  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index); // Toggle the submenu
  };
  const SideBarUrl = [
    {
      label: "Dashboard",
      icon: "bi bi-grid-fill",
      href: "/admin/dashboard",
    },
    {
      label: "User Management",
      icon: "bi bi-grid-fill",
      // href: "/admin/page1",
      child: [
        {
          label: "Add User ",
          icon: "bi bi-grid-fill",
          href: "users/create",
        },
        {
          label: "List Users",
          icon: "bi bi-grid-fill",
          href: "permission/list",
        },
        {
          label: "Add Permission ",
          icon: "bi bi-grid-fill",
          href: "permission/create",
        },
        {
          label: "List Permission",
          icon: "bi bi-grid-fill",
          href: "permission/list",
        },
        {
          label: "Add Role",
          icon: "bi bi-grid-fill",
          href: "role/create",
        },
        {
          label: "List Role",
          icon: "bi bi-grid-fill",
          href: "role/list",
        },
      ],
    },
  ];

  const renderSidebarItems = (items) => {
    return items.map((item, index) => (
      <li key={index} className={`sidebar-item ${item.child ? "has-sub" : ""}`}>
        <Link
          to={item.href}
          className="sidebar-link"
          onClick={() => item.child && toggleSubmenu(index)}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </Link>

        {/* Render submenu if item has children and is open */}
        {item.child && (
          <ul className={`submenu ${openSubmenu === index ? "active" : ""}`}>
            {item.child.map((child, childIndex) => (
              <li key={childIndex} className="submenu-item">
                <Link to={child.href}>{child.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div id="sidebar" className="active">
      <div className="sidebar-wrapper active">
        <div className="sidebar-header">
          <div className="d-flex justify-content-center">
            <div className="logo">
              <a href="#">
                <img src="../../../assets/logo.png" alt="Logo" />
              </a>
            </div>
            <div className="toggler">
              <a href="#" className="sidebar-hide d-xl-none d-block">
                <i className="bi bi-x bi-middle" />
              </a>
            </div>
          </div>
        </div>

        <div className="sidebar-menu">
          <ul className="menu">
            {/* Render the dynamic menu */}
            {renderSidebarItems(SideBarUrl)}
            <li className="sidebar-item" onClick={logout}>
              <Link onClick={(e) => logout()} className="sidebar-link">
                <i className="bi bi-grid-fill" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>

        <button className="sidebar-toggler btn x">
          <i data-feather="x" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
