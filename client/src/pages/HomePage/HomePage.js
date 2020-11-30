import React from "react";
import { Link } from "react-router-dom";

const HomePage = props => {
  return (
    <div className="home">
      <h1>HomePage</h1>
      <Link to="/menu">
        <button>MENU</button>
      </Link>
      <a href="http://localhost:5000/api/v1/auth/discord">
        <button>LOGIN</button>
      </a>
    </div>
  );
};

export default HomePage;
