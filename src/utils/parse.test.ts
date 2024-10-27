import {getTagName, parse} from './parse';

const simpleMessage = 'Обычный текст◄l•01••текст ссылки►';

const rootNodeBase = {
	attr: null,
	id: 0,
	name: null,
	parent: null
}

describe('parse', () => {
	it('Отделяет содержимое тега от обычного текста', () => {
		const input = simpleMessage;
		const expectedOutput = {
				0: {
					...rootNodeBase,
					content: ['Обычный текст', 1],
				},
				1: {
					id: 1,
					name: 'l',
					attr: ['01'],
					content: ['текст ссылки'],
					parent: 0
				}
			};

		const result = parse(input);

		console.log(result);

		expect(result).toEqual(expectedOutput);
	})
	it('Учитывает экранирование спецсимволов', () => {
		const input = '5‼•5=‼◄25‼►';
		const expectedOutput = {
			0: {
				...rootNodeBase,
				content: ['5•5=◄25►'],
			}
		};
		const result = parse(input);

		expect(result).toEqual(expectedOutput);
	})
	it('Определяет имя тега в 1 букву', () => {
		const input = simpleMessage;
		const expectedOutput = 'l';

		const result = getTagName(input, 13);

		expect(result).toBe(expectedOutput);
	})
	it('Определяет имя тега в 2 буквы', () => {
		const input = 'Обычный текст◄link•здесь код►';
		const expectedOutput = 'link';

		const result = getTagName(input, 13);

		expect(result).toBe(expectedOutput);
	})

	it('Разбирает тег на имя, содержимое и атрибуты', () => {
		const input = 'Обычный текст◄link•здесь код►';
		const expectedOutput = 'link';

		const result = getTagName(input, 13);

		expect(result).toBe(expectedOutput);
	})

	it('Правильно работает с тегом без атрибутов и контента', () => {
		const input = 'Обычный текст.◄d►Текст после паузы';
		const expectedOutput = {
			'0': {
				...rootNodeBase,
				content: [ 'Обычный текст.', 1, 'Текст после паузы' ],
			},
			'1': {
				id: 1,
				name: 'd',
				attr: null,
				content: [],
				parent: 0
			},
		};

		const result = parse(input);

		expect(result).toEqual(expectedOutput);
	})
});
	describe('parse', () => {
	it('Создает дерево с глубкой вложенностью', () => {
		const input: string = 'А◄an•0►◄n•►◄an•1•◄c•function { ◄n•2►}►►';
		const expectedOutput = {
			'0': {
				...rootNodeBase,
				content: [ 'А', 1, 2, 3 ],
			},
			'1': {
				id: 1,
					name: 'an',
					attr: [ '0' ],
					content: [],
					parent: 0
			},
			'2': {
				id: 2,
					name: 'n',
					attr: null,
					content: [],
					parent: 0
			},
			'3': {
				id: 3,
					name: 'an',
					attr: [ '1' ],
					content: [ 4 ],
					parent: 0
			},
			'4': {
				id: 4,
					name: 'c',
					attr: null,
					content: [ 'function { ', 5, '}' ],
					parent: 3
			},
			'5': {
				id: 5,
					name: 'n',
					attr: [ '2' ],
					content: [],
					parent: 4
			}
		};

		const result = parse(input);

		expect(result).toEqual(expectedOutput);
	})
});