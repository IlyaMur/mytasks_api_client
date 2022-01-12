import React, { useState, useEffect } from "react";
import AuthService from "../services/authService";
import AddTask from './AddTask.js'
import Task from './Task'
import { Container, Row, Col } from 'react-bootstrap'
import getJWTHeader from "../services/headerService";
import { Alert } from 'react-bootstrap'
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { API_URL } from '../apiConfig';

const Home = () => {
  const [tasks, setTasks] = useState([])
  const [errors, setErrors] = useState([])
  const [addShow, setAddShow] = useState(false);
  const [delShow, setDelShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  createAuthRefreshInterceptor(axios, AuthService.refreshAuthLogic);

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      getTasks();
    }
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get(API_URL + '/tasks', getJWTHeader());
      const tasks = response.data
      setTasks(tasks);
    } catch (error) {
      console.log(error)
    }
  }

  const addTask = async newTask => {
    try {
      await axios.post(API_URL + '/tasks', newTask, getJWTHeader());
      getTasks();
      resetFlashes();
      setAddShow(true);
    } catch (error) {
      console.log(error)
    }
  }

  const changeTaskState = async id => {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    try {
      await axios.patch(API_URL + `/tasks/${id}`, task, getJWTHeader());
      getTasks();
    } catch (error) {
      console.log(error)
    }
  }

  const editTask = async task => {
    try {
      await axios.patch(API_URL + `/tasks/${task.id}`, task, getJWTHeader());
      resetFlashes();
      setEditShow(true);
      getTasks();
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async id => {
    try {
      await axios.delete(API_URL + `/tasks/${id}`, getJWTHeader());
      resetFlashes();
      setDelShow(true);
      getTasks();
    } catch (error) {
      console.log(error)
    }
  };

  const resetFlashes = () => {
    setAddShow(false);
    setDelShow(false);
    setEditShow(false);
  }

  return (
    <div className='wrapper'>
      {AuthService.getCurrentUser &&
        <Container>
          <Row className='justify-content-center'>
            <div className="mt-3">
              <Alert onClose={() => setAddShow(false)} dismissible show={addShow} variant='success'>
                Task was added
              </Alert>
              <Alert onClose={() => setDelShow(false)} dismissible show={delShow} variant='danger'>
                Task was deleted
              </Alert>
              <Alert onClose={() => setEditShow(false)} dismissible show={editShow} variant='warning'>
                Task was edited
              </Alert>
            </div>
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
