import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Mahila Shakti Yojana</h1>
      <p>Sabhi mahilaon ko apne district me rojgar ke avsar.</p>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
