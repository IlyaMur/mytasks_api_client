import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import AddTask from './AddTask.js'
import Task from './Task'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import authHeader from "../services/auth-header";

const Home = () => {
  const [user, setUser] = useState([]);
  const [tasks, setTasks] = useState([])
  const [errors, setErrors] = useState([])

  const API_URL = "http://api.test/api";

  const updateToken = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(API_URL + '/refresh', {
        method: 'POST',
        body: JSON.stringify({
          refreshToken: user.refreshToken
        })
      });

      const json = await response.text();
      const data = JSON.parse(json);

      if (response.status === 200) {
        console.log("Got new access token and refresh token");
        localStorage.setItem("user", JSON.stringify(data));
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      getTasks()
    }
  }, []);

  const getTasks = async () => {
    try {
      const response = await fetch(API_URL + '/tasks', {
        headers: {
          'Authorization': authHeader()
        }
      });

      if (response.status === 200) {
        const json = await response.text();
        const data = JSON.parse(json);
        setTasks(data);
      } else {
        updateToken();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addTask = async newTask => {
    try {
      const response = await fetch(API_URL + '/tasks', {
        method: 'POST',
        headers: {
          'Authorization': authHeader()
        },
        body: JSON.stringify(newTask)
      });
      if (response.status !== 201) {
        updateToken();
      }
      getTasks();

    } catch (error) {
      console.log(error)
    }
  }

  const changeTaskState = async id => {
    try {
      const task = tasks.filter(task => task.id === id)[0];
      task.completed = !task.completed;
      const response = await fetch(API_URL + `/tasks/${id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': authHeader()
        },
        body: JSON.stringify(task)
      });
      if (response.status !== 200) {
        updateToken();
      }
      getTasks();

    } catch (error) {
      console.log(error)
    }
  }

  const editTask = async task => {
    try {
      const response = await fetch(API_URL + `/tasks/${task.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': authHeader()
        },
        body: JSON.stringify(task)
      });
      if (response.status !== 200) {
        updateToken();
      }
      getTasks();

    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async id => {
    try {
      await axios.delete(API_URL + `/tasks/${id}/`, { headers: authHeader() })
      getTasks()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='wrapper'>
      {AuthService.getCurrentUser &&
        <Container>
          <Row className='justify-content-center pt-5'>
            <Col>
              <h3>Tasks</h3>
              <AddTask addTask={addTask} errors={errors} setErrors={setErrors} />

              {tasks.map((task, index) => (
                <Task key={index} errors={errors} setErrors={setErrors} id={task.id} title={task.title} completed={task.completed} description={task.body} changeTaskState={changeTaskState} editTask={editTask} deleteTask={deleteTask} />
              ))}
            </Col>
          </Row>
        </Container>}
    </div>
  )
};

export default Home;
