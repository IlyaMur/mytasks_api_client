import React, { useState } from 'react'
import { Row, Col, Form, Button, Modal, Badge } from 'react-bootstrap'


const Task = ({ id, title, description, completed, changeTaskState, editTask, deleteTask }) => {
	const [show, setShow] = useState(false);
	const [newTitle, setTitle] = useState(title)
	const [newBody, setBody] = useState(description)

	const handleClose = () => {
		setShow(false);
		setTitle(title)
		setBody(description)
	}

	const handleShow = () => {
		setTitle(title)
		setBody(description)
		setShow(true);
	}

	const editTaskHandler = (title, body) => {
		handleClose();
		const task = {
			id,
			title,
			body,
		}

		if (title !== '' && body !== '') {
			editTask(task)
			setTitle(title)
			setBody(body)
		}
	}

	return (
		<div>
			<Col className='justify-content-center ps-5 pb-3'>
				<Row className='border-bottom'>
					<Col>
						<h5>{title}</h5>
						<p>{description}</p>
						<p>{completed ? <Badge bg="success" className='my-2'>Completed!</Badge> : ''}</p>
					</Col>

					<Col md={2} className='p-2'>
						<Form>
							<Button variant='info' size="sm" className='my-1 btn-block' onClick={handleShow}>
								Edit</Button>
						</Form>
						{completed ?
							<Form>
								<Button variant='secondary' size="sm" className='my-1 btn-block' onClick={() => changeTaskState(id)}>Undo</Button>
							</Form> :
							<Form>
								<Button variant='success' size="sm" className='my-1 btn-block' onClick={() => changeTaskState(id)}>Complete</Button>
							</Form>}

						<Form  >
							<Button variant='danger' size="sm" className='my-1 btn-block' onClick={() => deleteTask(id)}>Delete</Button>
						</Form>


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
						<Button variant="primary" onClick={() => editTaskHandler(newTitle, newBody)}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</Col>
		</div >
	)
}

export default Task