import { gerarPDF } from 'node-nfe-nfce';

import { createWriteStream } from 'fs';
import fs from 'fs/promises';
import path from 'path';

async function init() {
	console.log('Starting');
	const caminho = path.resolve('41230705333353000127551200000000281466014924-procNFe.xml');

	const arquivo = await fs.readFile(caminho, 'utf8');

	const pdf = await gerarPDF(arquivo);
	pdf.pipe(createWriteStream('out.pdf'));
	// console.log(pdf);
}

init();
