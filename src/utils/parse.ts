// noinspection LanguageDetectionInspection

import {allSpecSymbols, S, TagNames, TAGS, tagSpecSymbols} from '../constants';
import {NodeData} from '../types/common';
import {getTagNameError} from './error';

export const getTagName = (str: string, i: number) => {
	const tagStartPosition = i + 1;
	let tagName = '';

	if (str[i] === S.O) {
		for (let j = tagStartPosition; !tagSpecSymbols.has(str[j]) && str[j - 1] !== S.E; j++) {
			tagName += str[j];
		}
	}

	if (str[i] === S.C) {
		tagName = '';
	}

	return tagName;
}

type State = {
	id: number;
	name: TagNames | null;
	attr: string[] | null;
	content:  null | (NodeData | string)[];
	parent: number | null;
	currentTagName: string;
	currentAttribute: string;
	currentContent: string;
	positionInTag: number;
};

export const initialState: State = {
	id: NaN,
	name: null,
	attr: null,
	content: null,
	parent: null,
	currentTagName: '',
	currentAttribute: '',
	currentContent: '',
	positionInTag: 0,
};

export const emptyNode = {
	id: NaN,
	name: null,
	attr: null,
	content: null,
	parent: null,
}

export const getInitalState = (parent: number | null, id: number, prevState: State = initialState) =>
	Object.assign({}, { ...initialState, ...prevState, parent, id });

export const hasTag = (tag: string | null): tag is TagNames => Object.keys(TAGS).includes(tag as string);

export const checkIsContentPosition = (state: State) => state.positionInTag === getContentPositionByTagName(state.name);

export const getContentPositionByTagName = (tagName: TagNames | null) => {
	const tag = hasTag(tagName) ? TAGS[tagName] : null;

	if (tag === undefined) {
		throw getTagNameError(tagName as string);
	}

	return tag?.content ? tag.attr + 1 : 0;
}

export const getAttrCount = (tagName: TagNames | null) => {
	const tag = hasTag(tagName) ? TAGS[tagName] : null;
	if (tag === undefined) {
		throw getTagNameError(tagName as string);
	}
	return tag?.attr || 0;
}

export 	const parse = (str: string, setState?: (state: any) => void) => {

	const generateId = (() => {
		let id = 0;

		return () => id++
	})();

	const createNode = (parent: number) => {
		const id = generateId();
		nodes[id] = {
			...emptyNode,
			parent,
			id,
		};

		return id;
	};

	const getNodeFromState = (state: State) => {
		const { currentContent, currentAttribute, currentTagName } = state;
		if (currentContent) {
			if (!state.content) {
				state.content = new Array<NodeData>();
			}
			state.content.push(currentContent);
		}
		if (currentAttribute) {
			if (!state.attr) {
				state.attr = new Array<string>();
			}
			state.attr.push(currentAttribute);
		}

		if (currentTagName) {
			if (hasTag(currentTagName)) {
				state.name = currentTagName;
			} else {
				throw getTagNameError(currentTagName);
			}
		}
		const { name, attr, content, parent } = state;

		const id = generateId();
		const currentNode = { name, attr, content, parent, id };

		nodes[id] = currentNode;

		return currentNode;
	};

	const addNodeToContent = (state: State, nodeId: number) => {
		const parentNode = nodes[state.id];
		if (!parentNode.content) {
			parentNode.content = [];
		}
		// @ts-ignore content теперь точно массив
		parentNode.content.push(nodeId);
	};

	const addStateToCurrentNode = (state: State, i: number) => {
		const node = nodes[state.id];

		if (!state.name && state.id !== 0) {
			throw new Error(`У тега нет имени. Позиция: ${i}`);
		}

		//добавляем имя тега в узел
		if (state.name) {
			node.name = state.name;
		}

		// добавляем аттрибуты в узел
		if (state.attr) {
			node.attr = state.attr;
		} else if (state.currentAttribute) {
			node.attr = [];
		}
		if (state.currentAttribute) {
			// @ts-ignore attr теперь точно массив
			node.attr.push(state.currentAttribute);
		}

		// добавляем контент в узел
		if (!node.content) {
			node.content = [];
		}
		if (state.currentContent && node.content) {
			// @ts-ignore content теперь точно массив
			node.content.push(state.currentContent);
		}
	};

	const getStateFromNodes = (parentId: number): State => {
		const node = nodes[parentId];

		return {
			...initialState,
			...node,
			positionInTag: getContentPositionByTagName(node.name),
		}
	};

	const nodes: Record<number, NodeData> = {};
	const rootNode = getNodeFromState({ ...initialState });
	let state: State = getInitalState(null, rootNode.id);

	for (let i = 0; i < str.length; i++) {
		const prev = str[i - 1];
		const symbol = str[i];
		const next = str[i + 1];

		const hasEscapeBefore = prev === S.E;
		const isEscape = symbol === S.E;
		const hasSpecAfter = allSpecSymbols.has(next);

		const isOpenSymbol = symbol === S.O && !hasEscapeBefore;
		const isCloseSymbol = symbol === S.C && !hasEscapeBefore;
		const isDevideSymbol = symbol === S.D && !hasEscapeBefore;

		const isRootContent = state.parent === null;
		const isTagNamePosition = !isRootContent && state.positionInTag === 0;
		const isAttributePosition = !isTagNamePosition && !checkIsContentPosition(state);

		// console.log(`${i}: ${symbol}`);
		// if (i === NaN) {
		// 	debugger;
		// }

		setState?.((prev: any) => {
			// console.log(prev[0])
			return [...prev, {
				state, symbol, nodes
			}]
		});

		if (isOpenSymbol) {
			if (!checkIsContentPosition(state)) {
				// открывающий тег должен быть только в позиции контента (не атрибута, не имени тега)
				throw new Error(`Открывающий тег в неверной позиции: ${i}`);
			}

			// добавляем контент из state в текущий узел
			addStateToCurrentNode(state, i);

			// создаем новый узел
			const idForNewNode = createNode(state.id);

			// добавляем новый узел в контент текущего узла
			addNodeToContent(state, idForNewNode);

			// сбрасываем state и записываем в него новый узел
			state = getInitalState(state.id, idForNewNode);

			continue;
		}

		if (isCloseSymbol) {
			if (state.parent === null) {
				// закрывающий тег не должен быть в корневом узле
				throw new Error(`Закрывающий тег в неправильной позиции: ${i}`);
			}
			// записываем имя, если тег без атрибутов и контента
			if (isTagNamePosition) {
				// проверяем имя тега
				const {currentTagName} = state;
				if (hasTag(currentTagName)) {
					state.name = currentTagName;
					state.currentTagName = '';
				} else {
					throw getTagNameError(currentTagName);
				}
			}

			// добавляем контент состояния в контент текущего узла
			addStateToCurrentNode(state, i);

			// записываем в состояние родительский узел
			state = getStateFromNodes(state.parent);

			continue;
		}

		if (isDevideSymbol) {
			// при разделительном символе записываем имя тега или атрибута в состояние и увеличиваем позицию
			const {currentTagName, currentAttribute} = state;
			if (isTagNamePosition) {
				// проверяем имя тега
				if (hasTag(currentTagName)) {
					state.name = currentTagName;
					state.currentTagName = '';
				} else {
					throw getTagNameError(currentTagName);
				}
			}
			if (isAttributePosition && currentAttribute) {
				if (!state.attr) {
					state.attr = new Array<string>();
				}
				state.attr.push(currentAttribute);
				state.currentAttribute = '';
			}
			state.positionInTag++;
			continue;
		}

		if (isEscape && hasSpecAfter) {
			continue;
		}

		if (isTagNamePosition) {
			state.currentTagName += symbol;
			continue;
		}

		if (isAttributePosition) {
			state.currentAttribute += symbol;
			continue;
		}

		state.currentContent += symbol;
	}

	if (state.currentContent) {
		if (!rootNode.content) {
			rootNode.content = new Array<NodeData>();
		}
		rootNode.content.push(state.currentContent);
	}
	// console.log(str);
	// console.log(nodes);
	return nodes;
}