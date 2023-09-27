import { gerarPDF } from '@alexssmusica/node-pdf-nfe';

import { createWriteStream } from 'fs';
import fs from 'fs/promises';
import path from 'path';

async function init() {
	console.log('Starting');
	const caminho = path.resolve('41230905333353000127551090000002861418075739-procNFe.xml');
	const logo = path.resolve('logo.png');

	const arquivo = await fs.readFile(caminho, 'utf8');

	const pdf = await gerarPDF(arquivo, logo);
	pdf.pipe(createWriteStream('out.pdf'));
	// console.log(pdf);
}

init();
