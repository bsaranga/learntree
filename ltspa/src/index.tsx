import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { UserService } from './services/UserService';

import App from './App';

import './styles/index.scss';
import Expenses from './pages/Route1';
import Invoices from './pages/Route2';
import NoMatch from './pages/NoMatch';
import Protected from './pages/Protected';

const container = document.getElementById('root') as Element;
const root = createRoot(container);
const onAuth = () => root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />}>
				<Route path='route1' element={<Expenses/>}/>
				<Route path='route2' element={<Invoices/>}/>
				<Route path='protected' element={<Protected/>} />
				<Route path='*' element={<NoMatch/>}/>
			</Route>
		</Routes>
	</BrowserRouter>
);

UserService(onAuth);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
