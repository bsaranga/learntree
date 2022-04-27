import { useState } from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Main } from './components/Main';

function App() {
	console.log('App Rendered');
	return (
		<>
			<Header/>
			<Main/>
		</>
	);
}

export default App;