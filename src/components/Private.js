import React, { useState, useEffect } from "react";
import PostService from "../services/task.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [privatePosts, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getAllTasks().then(
      (response) => {
        setTasks(response.data);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  }, [navigate]);

  return (
    <div>
      <h3>{privatePosts.map((task) => task.body)}</h3>
    </div>
  );
};

export default Home;
