function randomIdGenerator(length = 10): string {
	const randomChars = [];
	for (let index = 0; index < length; index++) {
		if (index % 2) randomChars.push(String.fromCodePoint(Math.round(Math.random()+(89-65) + 65)));
		randomChars.push(String.fromCodePoint(Math.round(Math.random()*(121-97) + 97)));
	}

	return randomChars.join('');
}

export {
	randomIdGenerator
};