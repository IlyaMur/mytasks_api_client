import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import AddTodo from './AddTodo.js'
import Todo from './Todo'
import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState([]);
  const [todos, setTodos] = useState([])
  const [errors, setErrors] = useState([])

  const API_URL = "http://api.test/api";


  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      getTodos()
    }
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get(API_URL + '/tasks', { headers: { 'X-API-KEY': 'df7594c2af37ea8a8f30b8e419343948' } })
      const { data } = response
      setTodos(data)
    } catch (err) {
      console.log(err)
    }
  }

  const addTodo = async newTodo => {
    try {
      console.log(newTodo)
      await axios.post(API_URL + '/tasks', newTodo, { headers: { 'X-API-KEY': 'df7594c2af37ea8a8f30b8e419343948' } })
      getTodos()
    } catch (err) {
      setErrors(err.response.data.errors);
      console.log(errors);
    }
  }

  const completeTodo = async id => {
    try {
      const todo = todos.filter(todo => todo.id === id)[0]
      todo.completed = true
      await axios.patch(API_URL + `/tasks/${id}/`, todo, { headers: { 'X-API-KEY': 'df7594c2af37ea8a8f30b8e419343948' } })
      getTodos()
    } catch (err) {
      console.log(err);
    }
  }

  const unCompleteTodo = async id => {
    try {
      const todo = todos.filter(todo => todo.id === id)[0]
      todo.completed = false
      await axios.patch(API_URL + `/tasks/${id}/`, todo, { headers: { 'X-API-KEY': 'df7594c2af37ea8a8f30b8e419343948' } })
      getTodos()
    } catch (err) {
      console.log(err)
    }
  }

  const editTodo = async todo => {
    try {
      await axios.patch(API_URL + `/tasks/${todo.id}/`, todo, { headers: { 'X-API-KEY': 'df7594c2af37ea8a8f30b8e419343948' } })
      errors['updateTitle'] = '';
      setErrors(errors);
      getTodos()
    } catch (err) {
      console.log(errors);
    }
  }

  const deleteTodo = async id => {
    try {
      await axios.delete(API_URL + `/tasks/${id}/`, { headers: { 'X-API-KEY': 'df7594c2af37ea8a8f30b8e419343948' } })
      getTodos()
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='wrapper'>
      <Container>
        <Row className='justify-content-center pt-5'>
          <Col>
            <Card className='p-5'>
              <h3>Tasks</h3>
              <AddTodo addTodo={addTodo} errors={errors} setErrors={setErrors} />

              {todos.map((todo, index) => (
                <Todo key={index} errors={errors} setErrors={setErrors} id={todo.id} title={todo.title} completed={todo.completed} description={todo.body} unCompleteTodo={unCompleteTodo} completeTodo={completeTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
              ))}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
};


export default Home;
