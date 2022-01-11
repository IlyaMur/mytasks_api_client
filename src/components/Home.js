import React, { useState, useEffect } from "react";
import AuthService from "../services/authService";
import AddTask from './AddTask.js'
import Task from './Task'
import { Container, Row, Col } from 'react-bootstrap'
import getJWT from "../services/headerService";
import taskService from "../services/taskService";
import { Alert } from 'react-bootstrap'

const Home = () => {
  const [tasks, setTasks] = useState([])
  const [errors, setErrors] = useState([])
  const [addShow, setAddShow] = useState(false);
  const [delShow, setDelShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const API_URL = "https://rest-todoapp.herokuapp.com/api";


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      getTasks();
    }
  }, []);

  const getTasks = async () => {
    const options = {
      headers: {
        'Authorization': getJWT()
      }
    };

    try {
      const response = await fetch(API_URL + '/tasks', options);
      if (response.ok) {
        const json = await response.text();
        const data = JSON.parse(json);
        setTasks(data);
      } else {
        taskService.updateToken();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addTask = async newTask => {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': getJWT()
      },
      body: JSON.stringify(newTask)
    };

    try {
      const response = await fetch(API_URL + '/tasks', options);
      if (!response.ok) {
        taskService.updateToken();
      }
      getTasks();
      setAddShow(true);
    } catch (error) {
      console.log(error)
    }
  }

  const changeTaskState = async id => {
    const task = tasks.filter(task => task.id === id)[0];
    task.completed = !task.completed;
    const options = {
      method: 'PATCH',
      headers: {
        'Authorization': getJWT()
      },
      body: JSON.stringify(task)
    };

    try {
      const response = await fetch(API_URL + `/tasks/${id}/`, options);
      if (!response.ok) {
        taskService.updateToken();
      }
      getTasks();
    } catch (error) {
      console.log(error)
    }
  }

  const editTask = async task => {
    const options = {
      method: 'PATCH',
      headers: {
        'Authorization': getJWT()
      },
      body: JSON.stringify(task)
    };

    try {
      const response = await fetch(API_URL + `/tasks/${task.id}/`, options);
      if (!response.ok) {
        taskService.updateToken();
      } else {
        setEditShow(true);
      }
      getTasks();
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async id => {
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': getJWT()
      }
    };

    try {
      const response = await fetch(API_URL + `/tasks/${id}/`, options);
      if (!response.ok) {
        taskService.updateToken();
      } else {
        setDelShow(true);
      }
      getTasks();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='wrapper'>
      {AuthService.getCurrentUser &&
        <Container>
          <Row className='justify-content-center pt-5'>
            <Alert onClose={() => setAddShow(false)} dismissible show={addShow} variant='success'>
              Task was added
            </Alert>
            <Alert onClose={() => setDelShow(false)} dismissible show={delShow} variant='danger'>
              Task was deleted
            </Alert>
            <Alert onClose={() => setEditShow(false)} dismissible show={editShow} variant='warning'>
              Task was edited
            </Alert>
            <Col>
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
