import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [yScroll, setYScroll] = useState(null);

  // Bắt sự kiện onscroll của window
  window.onscroll = () => {
    setYScroll(window.scrollY);
  };

  return (
    <nav
      className={`navbar fixed-top navbar-expand-lg navbar-dark ${
        /* Nếu yScroll < 100 thì không có background ngược lại bg-dark*/
        yScroll < 100 ? "" : "bg-dark"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand text-danger fw-bold" to={"/"}>
          Movie App
        </Link>
        <Link className="btn btn-outline-light" to="/search">
          <i className="fas fa-search"></i>
        </Link>
      </div>
    </nav>
  );
}
