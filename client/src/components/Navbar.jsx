import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark vh-100" style={{ width: "250px" }}>
      <h4 className="text-white text-center">STO Dashboard</h4>
      <hr className="text-white" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white">
            <i className="bi bi-house-door"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/history" className="nav-link text-white">
            <i className="bi bi-clock-history"></i> Trade History
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link text-danger">
            <i className="bi bi-box-arrow-right"></i> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
