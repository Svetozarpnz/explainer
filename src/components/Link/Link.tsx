import React, {useContext} from 'react';
import styles from './Link.module.css';
import {Context} from "../Context/Context";

type Prop = {
    id: string;
    children: string;
    question: string;
}

export const Link = ({ id, question, children }: Prop) => {
    const { createMessage } = useContext(Context);
    const handleClick = () => {
        createMessage(id, question);
    }
    return (
        <span onClick={handleClick} className={styles.link}>{children}</span>
    )
}