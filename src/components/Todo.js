import React, { useState } from 'react'
import { Row, Col, Form, Button, Modal, Badge } from 'react-bootstrap'

const Todo = ({ id, title, description, completed, completeTodo, unCompleteTodo, editTodo, deleteTodo, errors, setErrors }) => {
	const [show, setShow] = useState(false);

	const [newTitle, setTitle] = useState(title)
	const [newBody, setBody] = useState(description)

	const handleClose = () => {
		setShow(false);
		setTitle(title)
		setBody(description)
	}

	const handleShow = () => setShow(true);

	const editTodoHandler = (title, body) => {
		handleClose();
		const todo = {
			id,
			title,
			body,
		}

		if (title !== '' && body !== '') {
			editTodo(todo)
			setTitle(title)
			setBody(body)
		}
	}

	return (
		<div>
			<Row className='border-bottom'>

				<Col>
					<h5>{title}</h5>
					<p>{description}</p>
					<p>{completed ? <Badge bg="success" className='my-2'>Completed!</Badge> : ''}</p>
				</Col>

				<Col md={2} className='p-2'>
					<Form>
						<Button variant='info' className='my-1 btn-block' onClick={handleShow}>Edit</Button>
					</Form>

					<Form  >
						<Button variant='danger' className='my-1 btn-block' onClick={() => deleteTodo(id)}>Delete</Button>
					</Form>
					{completed ?
						<Form>
							<Button variant='secondary' className='my-1 btn-block' onClick={() => unCompleteTodo(id)}>Undo</Button>
						</Form> :
						<Form>
							<Button variant='success' className='my-1 btn-block' onClick={() => completeTodo(id)}>Complete</Button>
						</Form>}

				</Col>
			</Row>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId='title'>
							<Form.Label>Title</Form.Label>
							<Form.Control type='text' value={newTitle} onChange={e => setTitle(e.target.value)} />
						</Form.Group>

						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control type='text' value={newBody} onChange={e => setBody(e.target.value)} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={() => editTodoHandler(newTitle, newBody)}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div >
	)
}

export default Todo