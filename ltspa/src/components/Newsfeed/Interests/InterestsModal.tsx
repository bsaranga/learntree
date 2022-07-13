import { message, Modal, Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import HttpContext from '../../../contexts/HttpContext';
import { Topic } from '../../../dataTypes/interfaces/topic';
import useRootStore, { rootActions } from '../../../store/rootStore/rootStore';

export default function InterestsModal() {

	const [topics, setTopics] = useState<Topic[] | null>(null);
	const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
	const httpContext = useContext(HttpContext);

	useEffect(() => {
		httpContext.get<Topic[]>('https://localhost:4157/api/lookup/topics').then(res => setTopics(res.data));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	const { Option } = Select;

	const optionsList = topics?.map((val) => {
		return <Option key={val.topicId}>{val.topicName}</Option>;
	});
    
	const dispatch = useRootStore(state => state.dispatch);
	const isFirstLogin = useRootStore(state => state.loggedInUser.isFirstLogin);

	function onCloseInterestsModal() {
		dispatch({type: rootActions.setIfFirstLoggedIn, payload: false});
	}

	async function onOkInterestsModal() {
		const res = await httpContext.post<number[]>('https://localhost:4157/api/user/usertopic', selectedTopics);
		if (res.status == 200) {
			message.success({ content: 'Interests registered', duration: 2, style: { marginTop: '2rem' } });
			dispatch({type: rootActions.setIfFirstLoggedIn, payload: false});
		}
	}

	function onSelect(selected: string[]) {
		setSelectedTopics(selected.map(str => Number(str)));
	}

	return <Modal title="Pick your interests" visible={isFirstLogin} onCancel={onCloseInterestsModal} width={640} centered={true} destroyOnClose={true} footer={(() => <button onClick={onOkInterestsModal} className='ring-2 ring-blue-300 hover:ring-blue-500 active:ring-blue-400 px-[.64rem] py-[.2rem] text-xs rounded-sm focus:outline-none'>Accept</button>)()}>
		<Select
			mode="multiple"
			optionFilterProp='children'
			filterOption={(input, option) => (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
			allowClear
			style={{ width: '100%' }}
			placeholder="Select your interests"
			onChange={(sel) => onSelect(sel)}
		>
			{optionsList}
		</Select>
	</Modal>;
}