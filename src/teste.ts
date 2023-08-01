class CPFGenerator {
	public static generateRandomCPF(withMask = false): string {
		const num1 = this.getRandomNumberString();
		const num2 = this.getRandomNumberString();
		const num3 = this.getRandomNumberString();
		const dig1 = this.calculateCPFVerifierDigit(num1, num2, num3);
		const dig2 = this.calculateCPFVerifierDigit(num1, num2, num3, dig1);

		if (withMask) {
			return this.formatCPFWithMask(num1, num2, num3, dig1, dig2);
		} else {
			return `${num1}${num2}${num3}${dig1}${dig2}`;
		}
	}

	private static calculateCPFVerifierDigit(n1: string, n2: string, n3: string, n4?: number): number {
		const nums = n1.split('').concat(n2.split(''), n3.split(''));

		if (n4 !== undefined) {
			nums[9] = String(n4);
		}

		let x = 0;

		for (let i = n4 !== undefined ? 11 : 10, j = 0; i >= 2; i--, j++) {
			x += parseInt(nums[j], 10) * i;
		}

		const y = x % 11;
		return y < 2 ? 0 : 11 - y;
	}

	private static formatCPFWithMask(num1: string, num2: string, num3: string, dig1: number, dig2: number): string {
		return `${num1}.${num2}.${num3}-${dig1}${dig2}`;
	}

	private static getRandomNumberString(): string {
		const aleat = Math.floor(Math.random() * 999);
		return aleat.toString().padStart(3, '0');
	}
}

// Example usage:

const randomCPF = CPFGenerator.generateRandomCPF();
console.log(randomCPF);
const maskedRandomCPF = CPFGenerator.generateRandomCPF(true);
console.log(maskedRandomCPF); // Outputs a random CPF with mask (e.g., 123.456.789-01)

class CNPJGenerator {
	private static totalArray = 8;
	private static n = 9;

	static generateCNPJ(useMask = false): string {
		const [n1, n2, n3, n4, n5, n6, n7, n8] = this.createArray(this.totalArray, this.n);
		const n9 = 0;
		const n10 = 0;
		const n11 = 0;
		const n12 = 1;

		let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
		d1 = 11 - this.mod(d1, 11);
		if (d1 >= 10) d1 = 0;

		let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
		d2 = 11 - this.mod(d2, 11);
		if (d2 >= 10) d2 = 0;

		return useMask
			? `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`
			: `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
	}

	private static createArray(total: number, numero: number): number[] {
		return Array.from(Array(total), () => this.numberRandom(numero));
	}

	private static numberRandom(number: number): number {
		return Math.round(Math.random() * number);
	}

	private static mod(dividendo: number, divisor: number): number {
		return Math.round(dividendo - Math.floor(dividendo / divisor) * divisor);
	}
}

// Exemplo de uso
const cnpj = CNPJGenerator.generateCNPJ();
const cnpj2 = CNPJGenerator.generateCNPJ(true);
console.log(cnpj);
console.log(cnpj2);
