import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const AddTodo = ({ addTodo, errors, setErrors }) => {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')

	const addTodoHandler = e => {
		e.preventDefault()
		addTodo({
			title,
			body,
			completed: false,
		})
	}

	const setBodyValue = e => {
		setBody(e.target.value);
		errors.body = '';
		setErrors(errors);
	}

	const setTitleValue = e => {
		setTitle(e.target.value);
		errors.title = '';
		setErrors(errors);
	}

	return (
		<Form>
			<Form.Group controlId='title'>
				<Form.Label>Task title</Form.Label>
				<Form.Control type='text' className='mb-2' placeholder='Enter Todo Title' onChange={setTitleValue} />
				{errors.title && (<p className='text-danger'>{errors.title}</p>)}
			</Form.Group>

			<Form.Group controlId='description'>
				<Form.Label>Task body</Form.Label>
				<Form.Control type='text' className='mb-2' placeholder='Enter Description' onChange={setBodyValue} />
				{errors.body && (<p className='text-danger'>{errors.body}</p>)}

			</Form.Group>

			<Button variant='primary' className='mt-3 mb-5' type='submit' onClick={addTodoHandler}>Add Todo</Button>
		</Form >
	)
}

export default AddTodo