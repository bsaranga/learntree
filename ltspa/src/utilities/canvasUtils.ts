/**
 * Given a string of text, break it into an array of lines each having a pixel length of maxWidth
 * @param text Input text
 * @param ctx CanvasRenderingContext2D
 * @param maxWidth Maximum pixel width
 * @param scaleFactor 
 * @returns Array of text lines
 */
function getLines(text: string, ctx: CanvasRenderingContext2D, maxWidth: number, scaleFactor: number): string[] {
	const wordArray = text.split(' ');
	const lineArray: string[] = [];
	let line = '';

	wordArray.forEach(w => {
		if (ctx.measureText(''.concat(...[line, ' ', w])).width * scaleFactor < maxWidth) {
			line += `${w} `;
		} else {
			lineArray.push(line.trimEnd());
			line = `${w} `;
		}
	});

	lineArray.push(line);
	return lineArray;
}

export {getLines};