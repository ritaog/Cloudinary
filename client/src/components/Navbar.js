import { Link } from "react-router-dom";

const navStyle = {
  height: 50,
  backgroundColor: "green",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderBottom: "grey 1px solid",
};

const Navbar = () => {
  return (
    <div style={navStyle}>
      <Link to="/" style={{ textDecoration: "none" }}>
        CRUD
      </Link>
      <Link to="/add" style={{ textDecoration: "none" }}>
        Add User
      </Link>
    </div>
  );
};

export default Navbar;
