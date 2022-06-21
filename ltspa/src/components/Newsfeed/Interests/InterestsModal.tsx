import { Modal, Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HttpContext from '../../../contexts/HttpContext';
import { Topic } from '../../../dataTypes/interfaces/topic';
import { useAppSelector } from '../../../store/hooks';
import { setIfFirstLogin } from '../../../store/slices/rootSlice';

export default function InterestsModal() {

	const [topics, setTopics] = useState<Topic[] | null>(null);
	const httpContext = useContext(HttpContext);

	useEffect(() => {
		httpContext.get<Topic[]>('https://localhost:4157/api/lookup/topics').then(res => setTopics(res.data));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	const { Option } = Select;

	const optionsList = topics?.map((val) => {
		return <Option key={val.topicId}>{val.topicName}</Option>;
	});
    
	const dispatch = useDispatch();
	const isFirstLogin = useAppSelector(state => state.root.loggedInUser.isFirstLogin);

	function onCloseInterestsModal() {
		dispatch(setIfFirstLogin(false));
	}

	function onOkInterestsModal() {
		console.log('Interests registered...');
	}

	return <Modal title="Pick your interests" visible={isFirstLogin} onCancel={onCloseInterestsModal} width={640} centered={true} destroyOnClose={true} footer={(() => <button onClick={onOkInterestsModal} className='ring-2 ring-blue-300 hover:ring-blue-500 active:ring-blue-400 px-[.64rem] py-[.2rem] text-xs rounded-sm focus:outline-none'>Accept</button>)()}>
		<Select
			mode="multiple"
			allowClear
			style={{ width: '100%' }}
			placeholder="Please select"
			onChange={(event) => console.log(event)}
		>
			{optionsList}
		</Select>
	</Modal>;
}