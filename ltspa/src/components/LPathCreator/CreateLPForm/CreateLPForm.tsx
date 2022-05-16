import { Button, Form, Input, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import HttpService from '../../../services/HttpService';
import {v4 as uuidv4} from 'uuid';

interface CreateLPFormProps {
	onOk: () => void,
	onCancel: () => void
}

export default function CreateLPForm({onOk, onCancel}: CreateLPFormProps) {

	const [title, setTitle] = useState<string|null>(null);
	const [description, setDescription] = useState<string|null>(null);
	const disableCreateButton = title == '' || title == null || description == '' || description == null;

	const httpClient = HttpService.client();

	function onFinish() {
		httpClient.post('https://localhost:4157/api/LearningPathMetaData', { lpCode: uuidv4(), title: title, description: description })
			.then(d => {
				if (d.status == 200) {
					message.success({ content: 'Learning Path Created', duration: 2, style: { marginTop: '2rem' } });
					onOk();
				} else {
					message.error({ content: `Learning Path Creation Failed: <Status: ${d.status}>`, duration: 2, style: { marginTop: '2rem' } });
				}
			}).catch(err => {
				message.error({ content: `Learning Path Creation Failed: <${err.message}>`, duration: 2, style: { marginTop: '2rem' } });
			});
	}

	function onFinishFailed() {
		message.error('Failed', 1);
	}
	
	return (
		<div className='-mb-4 -mt-2'>
			<Form
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					name="title"
					rules={[{ required: true, message: 'Please enter learning path title.' }]}
				>
					<Input placeholder='Title' onChange={e => setTitle(e.target.value.trim())} />
				</Form.Item>

				<Form.Item
					name="description"
					rules={[{ required: true, message: 'Please enter a short description.' }]}
				>
					<TextArea placeholder='Description' maxLength={200} allowClear autoSize={{minRows:1, maxRows:4}} onChange={e => setDescription(e.target.value.trim())} />
				</Form.Item>

				<Form.Item>
					<div className='flex space-x-2'>
						<Button disabled={disableCreateButton} type="primary" htmlType='submit'>Create</Button>
						<Button type='ghost' onClick={onCancel}>Cancel</Button>
					</div>
				</Form.Item>
			</Form>
		</div>
	);
}