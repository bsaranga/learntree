import { Button } from '@blueprintjs/core';
import HttpService from '../services/HttpService';
import Card from './Card';

const tempData = [
	{
		id: 1,
		authorName:'Rochard Nix', 
		authorTitle:'Particle Physicist', 
		LPathTitle:'Heisenberg Principle', 
		LPathSubtitle:'An introduction to uncertainty', 
		LPathDescription:'In quantum mechanics, the uncertainty principle (also known as Heisenberg&apos;s uncertainty principle) is any of a variety of mathematical inequalities[1] asserting a fundamental limit to the accuracy with which the values for certain pairs of physical quantities of a particle, such as position, x, and momentum, p, can be predicted from initial conditions.'
	},
	{
		id: 2,
		authorName:'Mariah Klepp', 
		authorTitle:'Biologist', 
		LPathTitle:'Photosynthesis', 
		LPathSubtitle:'Nature\'s Energy Production', 
		LPathDescription:'Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organisms activities. Some of this chemical energy is stored in carbohydrate molecules, such as sugars and starches, which are synthesized from carbon dioxide and water – hence the name photosynthesis, from the Greek phōs (φῶς), "light", and sunthesis (σύνθεσις), "putting together".[1][2][3] In most cases, oxygen is also released as a waste product that stores three times more chemical energy than the carbohydrates.[4] Most plants, algae, and cyanobacteria perform photosynthesis; such organisms are called photoautotrophs. Photosynthesis is largely responsible for producing and maintaining the oxygen content of the Earths atmosphere, and supplies most of the energy necessary for life on Earth.[5]'
	},
	{
		id: 3,
		authorName:'Rochard Nix', 
		authorTitle:'Particle Physicist', 
		LPathTitle:'Heisenberg Principle', 
		LPathSubtitle:'An introduction to uncertainty', 
		LPathDescription:'In quantum mechanics, the uncertainty principle (also known as Heisenberg&apos;s uncertainty principle) is any of a variety of mathematical inequalities[1] asserting a fundamental limit to the accuracy with which the values for certain pairs of physical quantities of a particle, such as position, x, and momentum, p, can be predicted from initial conditions.'
	},
	{
		id: 4,
		authorName:'Rochard Nix', 
		authorTitle:'Particle Physicist', 
		LPathTitle:'Heisenberg Principle', 
		LPathSubtitle:'An introduction to uncertainty', 
		LPathDescription:'In quantum mechanics, the uncertainty principle (also known as Heisenberg&apos;s uncertainty principle) is any of a variety of mathematical inequalities[1] asserting a fundamental limit to the accuracy with which the values for certain pairs of physical quantities of a particle, such as position, x, and momentum, p, can be predicted from initial conditions.'
	}
];

export function Main() {

	const httpClient = HttpService.client();
	
	async function callApi() {
		const result = await httpClient.get('https://localhost:4155/api/LPath/secured');
		console.log(result.data);
	}

	const cardList = tempData.map(c => {
		return <div key={c.id}>
			<Card authorName={c.authorName} authorTitle={c.authorTitle} LPathTitle={c.LPathTitle} LPathSubtitle={c.LPathSubtitle} LPathDescription={c.LPathDescription}/>
		</div>;
	});

	return(
		<div className="bg-slate-200 h-full">
			<Button onClick={callApi}>Call API</Button>
			<div className='container mx-auto w-4/5'>
				<div className='flex flex-col space-y-12'>
					{ cardList }
				</div>
			</div>
		</div>
	);
}