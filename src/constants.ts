export enum S {
	'O' = '◄', // открывающая граница тега
	'C' = '►', // закрывающая граница тега
	'D' = '•', // разделитель атрибутов тега
	'E' = '‼', // экранирование символа
}

export const allSpecSymbols = new Set<string>([S.O, S.C, S.D, S.E]);
export const boundarySymbols = new Set<string>([S.O, S.C]);
export const tagSpecSymbols = new Set<string>([S.D, S.O, S.C]);

export type TagNames = keyof typeof TAGS;

export const TAGS = {
	l: {
		attr: 2,
		content: true,
	}
}