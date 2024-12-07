import * as React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <span style={{ textAlign: "center", alignItems: "center" }}>
        <h2>
          <Link to={"/admin/users"}>USER</Link> |
          <Link to={"/admin/houses"}>HOUSE</Link>
        </h2>
      </span>
      <br />
    </>
  );
}

export default Navbar;
