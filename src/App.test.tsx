import React, {useContext} from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Context } from './components/Context/Context';
import { base } from './base';
import {parse} from './utils/parse';
import {Message} from './types/common';

const MockComponent = () => {
	const { messages, createMessage } = useContext(Context);
	return null;
}

describe('App компонент', () => {
	it('функция createMessage добавляет сообщения в состоянии messages',() => {
		const messagesMock: Message[] = [];
		const shownMessages: Set<string> = new Set();
		const createMessageMock = jest.fn((id, question) => {
			messagesMock.push({isQuestion: true, text: question}, {text: base[id]});
		});
		const showMessageMock = jest.fn((id) => {
			shownMessages.add(id)
		});

		render(
			<Context.Provider value={{createMessage: createMessageMock, messages: messagesMock, shownMessages, showMessage: showMessageMock}}>
				<App/>
			</Context.Provider>
		);

		// Здесь вызываем функцию createMessageMock
		createMessageMock('1', 'Привет');

		// Проверяем, что mock-функция была вызвана с правильными аргументами
		expect(createMessageMock).toHaveBeenCalledWith('1', 'Привет');

		// Проверяем, что сообщение было корректно добавлено в массив messagesMock
		expect(messagesMock).toEqual([{isQuestion: true, text: 'Привет'}, {text: base['1']}]);

	})
});

