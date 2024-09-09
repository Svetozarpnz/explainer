import React, {useContext} from 'react';
import styles from './Chat.module.css';
import {Link} from "../Link/Link";
import {Context} from "../Context/Context";

export const Chat = () => {
    const {messages} = useContext(Context);
    const topics = [{
        id: '01',
        question: 'Что такое замыкание?',
        topic: 'Замыкания'
    }];

    return (
        <div className={styles.chatWrapper}>
          <div>
              {messages.map(({ isQuestion, text}, i) => {

                  return (
                    <div
                        key={i}
                        className={isQuestion ? styles.question : styles.answer}
                    >
                        {text}
                    </div>
                  )
              })}
          </div>
            <div>
                {topics.map(({id, question, topic}) => (
                    <Link key={id} id={id} question={question}>{topic}</Link>
                ))}

            </div>
        </div>
    )
}