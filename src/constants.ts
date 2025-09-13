import { Link } from './components/Link/Link';

export enum S {
	'O' = '◄', // открывающая граница тега
	'C' = '►', // закрывающая граница тега
	'D' = '•', // разделитель атрибутов тега
	'E' = '‼', // экранирование символа
}

export const allSpecSymbols = new Set<string>([S.O, S.C, S.D, S.E]);
export const boundarySymbols = new Set<string>([S.O, S.C]);
export const tagSpecSymbols = new Set<string>([S.D, S.O, S.C]);

export type Tags = typeof TAGS;
export type TagNames = keyof Tags;
export type TagProps<T extends TagNames> = (typeof TAGS)[T]['props'][number]

export const TAGS = {
	l: {
		attr: 2,
		content: true,
		component: Link,
		props: ['id', 'question'],
	},
	bn: {
		attr: 0,
		content: true,
		component: Link,
		props: ['id', 'question'],
	},
	n: {
		attr: 1,
		content: false,
		component: Link,
		props: ['id', 'question'],
	},
	c: {
		attr: 0,
		content: true,
		component: Link,
		props: ['id', 'question'],
	},
	d: {
		attr: 1,
		content: false,
		component: Link,
		props: ['id', 'question'],
	},
	an: {
		attr: 1,
		content: true,
		component: Link,
		props: ['id', 'question'],
	},
	a: {
		attr: 3,
		content: true,
		component: Link,
		props: ['id', 'question'],
	}
} as const;
