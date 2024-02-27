import fs from 'fs';
import { DistribuicaoDFe } from 'node-mde';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certificadoCaminho = path.resolve(__dirname, '05333353000127.pfx');
const pfx = fs.readFileSync(certificadoCaminho);
console.log(pfx);

const distribuicao = new DistribuicaoDFe({
	pfx,
	passphrase: '3411',
	cnpj: '05333353000127',
	tpAmb: '2'
});

const consulta = await distribuicao.consultaUltNSU('000000000000000');

if (consulta.error) {
	throw new Error(consulta.error);
}

console.log(consulta);
