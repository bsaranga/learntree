import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import UserService from './services/UserService';
import './index.scss';
import 'antd/dist/antd.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root') as Element;
const root = createRoot(container);
const appRenderCb = () => root.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>
);

UserService.initKeyCloak(appRenderCb);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
