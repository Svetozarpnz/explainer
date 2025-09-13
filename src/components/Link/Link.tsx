import React, {useContext} from 'react';
import styles from './Link.module.css';
import {Context} from "../Context/Context";

type Prop = {
    id: string;
    children: React.ReactNode;
    question: string;
}

export const Link = ({ id, question, children }: Prop) => {
    const { createMessage, showMessage, shownMessages } = useContext(Context);
    const handleClick = () => {
        createMessage(id, question);
        showMessage(id);
    }
    const isVisited = shownMessages.has(id);
    const className = isVisited ? styles.visited : '';

    return (
        <span onClick={handleClick} className={styles.link + ' ' + className}>{children}</span>
    )
}
