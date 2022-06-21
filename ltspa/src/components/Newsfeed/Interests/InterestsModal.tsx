import { Modal, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store/hooks';
import { setIfFirstLogin } from '../../../store/slices/rootSlice';

const tempInterests = ['Accounting', 'Macroeconomics', 'Biology', 'Quantum Physics', 'Data Structures', 'Algorithms', 'Front End Development', 'Backend Development', 'C#'];

export default function InterestsModal() {
	const { Option } = Select;

	const optionsList = tempInterests.map((i, ind) => {
		return <Option key={`${i}-${ind}`}>{i}</Option>;
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