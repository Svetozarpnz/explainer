import {allSpecSymbols, S, TagNames, TAGS, tagSpecSymbols} from '../constants';
import {TagData} from '../types/common';
import {getTagNameError} from './error';

// const str = 'Замыкание - это $c:01::1:функция^ и внешние переменные. $d^ Ярким примером замыкания является' +
// 	'функция со счетчиком: $n^$an:1:$cfunction { $n:2^}^^$d^$a:1:12:w:myFn ^^';
// const difficultTag = '◄an:1:◄c•function { ◄n•2►}►►◄d►◄a•1•12•w•myFn ►'

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

export const parseTag = (str: string) => {

}

type State = {
	name: TagNames | null;
	attr: string[] | null;
	content:  null | (TagData | string)[];
	parent: TagData | null;
	currentTagName: string;
	currentAttribute: string;
	currentContent: string;
	positionInTag: number;
};

export const initialState: State = {
	name: null,
	attr: null,
	content: null,
	parent: null,
	currentTagName: '',
	currentAttribute: '',
	currentContent: '',
	positionInTag: 0,
};

export const getInitalState = (parent: TagData | null = null) => Object.assign({}, { ...initialState, parent });

export const hasTag = (tag: string | null): tag is TagNames => Object.keys(TAGS).includes(tag as string);
export const getTagDataFromState = (state: State) => {
	const { currentContent, currentAttribute, currentTagName } = state;
	if (currentContent) {
		if (!state.content) {
			state.content = new Array<TagData>();
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

	return { name, attr, content, parent };
}

export const addNewTagToParentContent = (state: State) => {
	if (!state.parent) {
		throw new Error('addNewTagToParentContent нельзя вызывать со state без родителя');
	}
	if (!state.parent.content) {
		state.parent.content = [];
	}
	const parentContent = state.parent?.content ?? [];
	const newTag = getTagDataFromState(state);
	parentContent.push(newTag);
}

export const getContentPositionByTagName = (tagName: TagNames | null) => {
	const tag = hasTag(tagName) ? TAGS[tagName] : null;

	return tag?.content ? tag.attr + 1 : NaN;
}

export 	const parse = (str: string) => {
	const globalTag = getTagDataFromState({ ...initialState });
	let state = getInitalState(globalTag);

	for (let i = 0; i < str.length; i++) {
		console.log('state: ', state);
		const prev = str[i - 1];
		const symbol = str[i];
		const next = str[i + 1];

		const hasEscapeBefore = prev === S.E;
		const isEscape = symbol === S.E;
		const hasSpecAfter = allSpecSymbols.has(next);

		const isOpenSymbol = symbol === S.O && !hasEscapeBefore;
		const isCloseSymbol = symbol === S.C && !hasEscapeBefore;
		const isDevideSymbol = symbol === S.D && !hasEscapeBefore;

		const isGlobalContent = state.parent === globalTag;
		const isTagNamePosition = !isGlobalContent && state.positionInTag === 0;
		const isContentPosition = state.positionInTag === getContentPositionByTagName(state.name);
		const isAttributePosition = !isTagNamePosition && !isContentPosition;

		if (isOpenSymbol) {
			// при открытом символе тега создаем тег-объект из текущего state и записываем его в родители новом state
			addNewTagToParentContent(state);
			state = getInitalState(state.parent);
			continue;
		}

		if (isCloseSymbol) {
			// при закрытом символе тега создаем тег-объект из текущего state, добавляем  в контент родителя и меняем родителя на верхнего
			addNewTagToParentContent(state);
			if (state.parent) {
				state = getInitalState(state.parent.parent);
			} else {
				throw new Error(`Закрывающий тег в неправильной позиции: ${i}`);
			}
			continue;
		}

		if (isDevideSymbol) {
			// при разделительном символе записываем имя тега или атрибута в состояние и увеличиваем позицию
      const { currentTagName, currentAttribute} = state;
			if (state.currentTagName) {
				if (hasTag(currentTagName)) {
					state.name = currentTagName;
					state.currentTagName = '';
				} else {
					throw getTagNameError(currentTagName);
				}
			}
			if (currentAttribute) {
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
		}

		state.currentContent += symbol;
	}

	if (state.currentContent) {
		if (!globalTag.content) {
			globalTag.content = new Array<TagData>();
		}
		globalTag.content.push(state.currentContent);
	}
	return globalTag;
}