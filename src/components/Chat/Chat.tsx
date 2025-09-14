import React, {useContext} from 'react';
import styles from './Chat.module.css';
import {Link} from "../Link/Link";
import {Context} from "../Context/Context";
import {cn} from '../../utils/css';

export const Chat = () => {
	const {messages} = useContext(Context);
	const topics = [
		{
			id: '01', question: 'Что такое замыкание?', topic: 'Замыкания'
		},
		{
			id: '02', question: 'Что есть функция в JS?', topic: 'Функции'
		},
		{
			id: '03', question: 'Расскажи про инструмент Explainer', topic: 'Про Explainer'
		}
	];



	return (
		<div className={styles.chatWrapper}>
			<div className={styles.messageContainer}>
				{messages.map(({isQuestion, text}, i) => {
					return (
						<div className={cn(styles.messageWrapper, isQuestion ? styles.question : styles.answer)} key={i}>
							<div className={cn(styles.message)}>
								{text}
							</div>
						</div>
					)
				})}
			</div>
			<div>
				{topics.map(({id, question, topic}) => (
					<p>
						<Link key={id} id={id} question={question}>{topic}</Link>
					</p>
				))}
			</div>
		</div>
	)
}



