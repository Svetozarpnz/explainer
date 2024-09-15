import {getTagName, parse} from './parse';

const simpleMessage = 'Обычный текст◄c•здесь код►';
const difficultTag = '◄an•1•◄c•function { ◄n•2►}►►◄d►◄a•1•12•w•myFn ►'

describe('parse', () => {
	it('Отделяет содержимое тега от обычного текста', () => {
		const input = simpleMessage;
		const expectedOutput = [
			{
				"content": "Обычный текст",
				"name": ""
			},
			{
				"content": "c•здесь код",
				"name": "c"
			}
		];

		const result = parse(input);

		expect(result).toEqual(expectedOutput);
	})
});
//
// describe('getTagName', () => {
// 	it('Учитывает экранирование спецсимволов', () => {
// 		const input = '5‼•5=‼◄25‼►';
// 		const expectedOutput = ['5•5=◄25►'];
//
// 		const result = parse(input);
//
// 		expect(result).toEqual(expectedOutput);
// 	})
// 	it('Определяет имя тега в 1 букву', () => {
// 		const input = simpleMessage;
// 		const expectedOutput = 'c';
//
// 		const result = getTagName(input, 13);
//
// 		expect(result).toBe(expectedOutput);
// 	})
// 	it('Определяет имя тега в 2 буквы', () => {
// 		const input = 'Обычный текст◄link•здесь код►';
// 		const expectedOutput = 'link';
//
// 		const result = getTagName(input, 13);
//
// 		expect(result).toBe(expectedOutput);
// 	})
//
// 	it('Разбирает тег на имя, содержимое и атрибуты', () => {
// 		const input = 'Обычный текст◄link•здесь код►';
// 		const expectedOutput = 'link';
//
// 		const result = getTagName(input, 13);
//
// 		expect(result).toBe(expectedOutput);
// 	})
// });