import { gerarPDF } from 'node-nfe-nfce';

import { createWriteStream } from 'fs';
import fs from 'fs/promises';
import path from 'path';

async function init() {
	const caminho = path.resolve('41230605333353000127651090000010869709527181-procNFe.xml');

	const arquivo = await fs.readFile(caminho, 'utf8');
	const pdf = await gerarPDF(arquivo);
	pdf.pipe(createWriteStream('out.pdf'));
	console.log(pdf);
}

init();
