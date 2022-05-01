import { Button } from '@blueprintjs/core';
import { useContext } from 'react';
import MessageHubContext from '../contexts/MessageHubContext';
import ICardProps from '../interfaces/ICardProps';
import HttpService from '../services/HttpService';
import Card from '../components/Newsfeed/Card/Card';

const tempData: ICardProps[] = [
	{
		id: 1,
		author: {
			name:'Rochard Nix', 
			imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
			title:'Particle Physicist',
		},
		lPath: {
			title:'Heisenberg Principle', 
			subtitle:'An introduction to uncertainty', 
			description:'In quantum mechanics, the uncertainty principle (also known as Heisenberg&apos;s uncertainty principle) is any of a variety of mathematical inequalities[1] asserting a fundamental limit to the accuracy with which the values for certain pairs of physical quantities of a particle, such as position, x, and momentum, p, can be predicted from initial conditions.'
		},
		votes: {
			upvotes: Math.round(Math.random()*100),
			downvotes: Math.round(Math.random()*100)
		}
	},
	{
		id: 2,
		author:{
			name:'Mariah Klepp', 
			imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
			title:'Biologist',
		},
		lPath: {
			title:'Photosynthesis', 
			subtitle:'Nature\'s Energy Production', 
			description:'Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organisms activities. Some of this chemical energy is stored in carbohydrate molecules, such as sugars and starches, which are synthesized from carbon dioxide and water – hence the name photosynthesis, from the Greek phōs (φῶς), "light", and sunthesis (σύνθεσις), "putting together".[1][2][3] In most cases, oxygen is also released as a waste product that stores three times more chemical energy than the carbohydrates.[4] Most plants, algae, and cyanobacteria perform photosynthesis; such organisms are called photoautotrophs. Photosynthesis is largely responsible for producing and maintaining the oxygen content of the Earths atmosphere, and supplies most of the energy necessary for life on Earth.[5]'
		},
		votes: {
			upvotes: Math.round(Math.random()*100),
			downvotes: Math.round(Math.random()*100)
		}
	},
	{
		id: 3,
		author:{
			name:'Antoinette Letterman', 
			imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
			title:'Economist', 
		},
		lPath: {
			title:'Principles of Microeconomics (Basics)', 
			subtitle:'A one-semester course', 
			description:'This adaptation employs methods that use equations sparingly and do not utilize calculus. The key issues in most chapters are analyzed by introducing a numerical example or case study at the outset. Students are introduced immediately to the practice of taking a data set, examining it numerically, plotting it, and again analyzing the material in that form. The end-of-chapter problems involve numerical and graphical analysis, and a small number of problems in each chapter involve solving simple linear equations (intersecting straight lines). However, a sufficient number of questions is provided for the student to test understanding of the material without working through that subset of questions.'
		},
		votes: {
			upvotes: Math.round(Math.random()*100),
			downvotes: Math.round(Math.random()*100)
		}	
	},
	{
		id: 4,
		author:{
			name:'Mitchell Franklin', 
			imageUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
			title:'Financial Analyst', 
		},
		lPath: {
			title:'Principles of Accounting Volume 1 Financial Accounting', 
			subtitle:'Two semester accounting course', 
			description:'Principles of Accounting is designed to meet the scope and sequence requirements of a two-semester accounting course that covers the fundamentals of financial and managerial accounting. Due to the comprehensive nature of the material, we are offering the book in two volumes. This book is specifically designed to appeal to both accounting and non-accounting majors, exposing students to the core concepts of accounting in familiar ways to build a strong foundation that can be applied across business fields. Each chapter opens with a relatable real-life scenario for today’s college student. Thoughtfully designed examples are presented throughout each chapter, allowing students to build on emerging accounting knowledge. Concepts are further reinforced through applicable connections to more detailed business processes. Students are immersed in the “why” as well as the “how” aspects of accounting in order to reinforce concepts and promote comprehension over rote memorization.'
		},
		votes: {
			upvotes: Math.round(Math.random()*100),
			downvotes: Math.round(Math.random()*100)
		}
	}
];

export function NewsFeed() {

	const httpClient = HttpService.client();
	const hub = useContext(MessageHubContext);
	
	async function callApi() {
		const result = await httpClient.get('https://localhost:4155/api/LPath/secured');
		console.log(result.data);
	}

	async function sendMessage() {
		await hub.invoke('SendMessage', 'Hello World')
			.catch(err => console.error(err));
	}

	async function closeConenction() {
		await hub.stop().then(x => console.log(x)).catch(err => console.error(err));
	}

	hub.off('AcceptMessage');
	hub.on('AcceptMessage', (data) => console.log(data));
 
	const cardList = tempData.map(c => {
		return <div key={c.id}>
			<Card data={c}/>
		</div>;
	});

	console.log('Main Rendered');

	return(
		<div className='flex flex-col space-y-12 w-min'>
			<div className='absolute left-0'>
				<Button onClick={callApi}>Call API</Button>
				<Button onClick={sendMessage}>Send Message</Button>
				<Button onClick={closeConenction}>Stop Connection</Button>
			</div>
			{ cardList }
		</div>
	);
}