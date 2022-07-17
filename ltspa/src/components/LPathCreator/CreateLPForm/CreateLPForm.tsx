import { Button, Form, Input, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import HttpService from '../../../services/HttpService';
import {v4 as uuidv4} from 'uuid';
import useLPathStore, { lPathMetaDataActions } from '../../../store/learningPathStore/learningPathStore';
import useGraphStore, { addMetaData } from '../../../store/graphStore/graphStore';
import { useNavigate } from 'react-router-dom';

interface CreateLPFormProps {
	onOk: () => void,
	onCancel: () => void
}

export default function CreateLPForm({onOk, onCancel}: CreateLPFormProps) {

	const navigate = useNavigate();
	const [title, setTitle] = useState<string|undefined>(undefined);
	const [subTitle, setSubTitle] = useState<string|undefined>(undefined);
	const [description, setDescription] = useState<string|undefined>(undefined);
	const disableCreateButton = title == '' || title == null || description == '' || description == null;

	const { setActiveLPath } = lPathMetaDataActions;

	const httpClient = HttpService.client();
	const dispatch = useLPathStore(state => state.dispatch);
	const eventStoreDispatch = useGraphStore(state => state.dispatch);

	function onFinish() {
		const lpCode = uuidv4();
		httpClient.post('https://localhost:4157/api/LearningPathMetaData', { lpCode: lpCode, title: title, subTitle: subTitle, description: description })
			.then(d => {
				if (d.status == 200) {
					message.success({ content: 'Learning Path Created', duration: 2, style: { marginTop: '2rem' } });
					const lPathMetaData = {lPathCode: lpCode, lPathName: title, lPathSubTitle: subTitle, lPathDescription: description};
					dispatch({type: setActiveLPath, payload: lPathMetaData});
					eventStoreDispatch({type: addMetaData, payload: { delta: lPathMetaData }});
					onOk();
				} else {
					message.error({ content: `Learning Path Creation Failed: <Status: ${d.status}>`, duration: 2, style: { marginTop: '2rem' } });
				}
			}).catch(err => {
				message.error({ content: `Learning Path Creation Failed: <${err.message}>`, duration: 2, style: { marginTop: '2rem' } });
				navigate('/');
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
					<Input placeholder='Title' onChange={e => setTitle(e.target.value)} />
				</Form.Item>

				<Form.Item
					name="sub-title"
					rules={[{ required: true, message: 'Please enter learning path sub-title.' }]}
				>
					<Input placeholder='Sub Title' onChange={e => setSubTitle(e.target.value)} />
				</Form.Item>

				<Form.Item
					name="description"
					rules={[{ required: true, message: 'Please enter a short description.' }]}
				>
					<TextArea placeholder='Description' maxLength={200} allowClear autoSize={{minRows:1, maxRows:4}} onChange={e => setDescription(e.target.value)} />
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