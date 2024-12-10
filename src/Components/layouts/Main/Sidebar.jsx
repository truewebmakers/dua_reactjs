import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  // State to track whether the submenu is open or not
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index); // Toggle the submenu
  };
  const SideBarUrl = [
    {
      label : "Dashboard",
      icon : "bi bi-grid-fill",
      href: "/admin/dashboard",

    },
    {
      label : "Other Pages",
      icon : "bi bi-grid-fill",
      // href: "/admin/page1",
      child: [
        {
          label : "Child1",
          icon : "bi bi-grid-fill",
          href: "/admin/page1",
        },
        {
          label : "Child2",
          icon : "bi bi-grid-fill",
          href: "/admin/page2",
        }
      ]

    },
       
  ];

  const renderSidebarItems = (items) => {
    return items.map((item, index) => (
      <li key={index} className={`sidebar-item ${item.child ? 'has-sub' : ''}`}>
        <Link to={item.href} className="sidebar-link" onClick={() => item.child && toggleSubmenu(index)}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </Link>

        {/* Render child items if exists and is open */}
        {item.child && openSubmenu === index && (
          <ul className="submenu">
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
        <div className="d-flex justify-content-between">
          <div className="logo">
            <a href="#"><img src="../../../assets/images/logo/logo.png" alt="Logo" /></a>
          </div>
          <div className="toggler">
            <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle" /></a>
          </div>
        </div>
      </div>

      <div className="sidebar-menu">
        <ul className="menu">
          {/* Render the dynamic menu */}
          {renderSidebarItems(SideBarUrl)} 
        </ul>
      </div>

      <button className="sidebar-toggler btn x"><i data-feather="x" /></button>
    </div>
  </div>
    // <div id="sidebar" className="active">
    //   <div className="sidebar-wrapper active">
    //     <div className="sidebar-header">
    //       <div className="d-flex justify-content-between">
    //         <div className="logo">
    //           <a href="#"><img src="../../../assets/images/logo/logo.png" alt="Logo" /></a>
    //         </div>
    //         <div className="toggler">
    //           <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle" /></a>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="sidebar-menu">
    //       <ul className="menu">
    //         <li className="sidebar-title">Menu</li>

    //         <li className="sidebar-item">
    //           <a href="index.html" className="sidebar-link">
    //             <i className="bi bi-grid-fill" />
    //             <span>Dashboard</span>
    //           </a>
    //         </li>

    //         {/* Components menu with toggle functionality */}
    //         <li className={`sidebar-item has-sub ${isMenuOpen ? 'active' : ''}`}>
    //           <a href="#" className="sidebar-link" onClick={toggleMenu}>
    //             <i className="bi bi-stack" />
    //             <span>Components</span>
    //           </a>

    //           {/* Conditional rendering for submenu */}
    //           <ul className={`submenu ${isMenuOpen ? 'active' : ''}`}>
    //             <li className="submenu-item">
    //               <a href="component-alert.html">Alert</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-badge.html">Badge</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-breadcrumb.html">Breadcrumb</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-button.html">Button</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-card.html">Card</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-carousel.html">Carousel</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-dropdown.html">Dropdown</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-list-group.html">List Group</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-modal.html">Modal</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-navs.html">Navs</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-pagination.html">Pagination</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-progress.html">Progress</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-spinner.html">Spinner</a>
    //             </li>
    //             <li className="submenu-item">
    //               <a href="component-tooltip.html">Tooltip</a>
    //             </li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </div>
    //     <button className="sidebar-toggler btn x"><i data-feather="x" /></button>
    //   </div>
    // </div>
  );
}

export default Sidebar;
