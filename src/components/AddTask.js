import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik';
import * as Yup from 'yup'

const AddTask = ({ addTask, errors }) => {
	const handleSubmit = values => {
		const { body, title } = values;
		addTask({
			title,
			body,
			completed: false,
		})
	}

	const validationSchema = Yup.object().shape({
		title: Yup.string()
			.max(100, "*Title must be less than 100 characters")
			.required("*Title is required"),
		body: Yup.string()
			.max(250, "*Email must be less than 100 characters")
			.required("*Description is required")
	})

	return (
		<div>
			<div className="p-3 mt-4">
				<Formik initialValues={{ title: "", body: "" }}
					validationSchema={validationSchema}
					onSubmit={(handleSubmit)}
				>
					{({ values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
					}) => (

						<Form onSubmit={handleSubmit}>
							<h4>Tasks</h4>
							<Form.Group className="mb-3">
								<Form.Label>Task title</Form.Label>
								<Form.Control
									name="title" type="text" placeholder="Enter title" onChange={handleChange} onBlur={handleBlur} value={values.title} className={touched.title && errors.title ? "error" : null}
								/>
								{touched.title && errors.title ? (
									<div className="error-message">{errors.title}</div>
								) : null}
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Task description</Form.Label>
								<Form.Control
									as="textarea" name="body" type="text" onChange={handleChange} onBlur={handleBlur} placeholder="Password" value={values.body} className={touched.body && errors.body ? "error" : null}
								/>
								{touched.body && errors.body ? (
									<div className="error-message">{errors.body}</div>
								) : null}
							</Form.Group>

							<Button variant="primary" type=" submit" className="mt-2 mb-4" >
								Add Task
							</Button >
						</Form>
					)}
				</Formik>
				{errors.general && (<p className='text-danger text-end'>{errors.general}</p>)}

			</div>

		</div>
	)
}

export default AddTask