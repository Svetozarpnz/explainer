import React from 'react';
import {Chat} from "./components/Chat/Chat";
import {Context} from "./components/Context/Context";
import {base} from "./base";
import {Message} from "./types/common";
import styles from './App.module.css';
import { rnd } from './utils/rnd';
import { parse } from './utils/parse';
import { MessageNode } from './components/MessageNode/MessageNode';

const prologs = [
  'Как я и говорил, ',
  'Повторюсь, ',
  'Да-да, ',
];

function App() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [shownMessages, setShownMessages] = React.useState<Set<string>>(new Set());

  const createMessage = (id: string, question: string) => {
    const prolog = shownMessages.has(id) ? prologs[rnd(prologs.length - 1)] : '';
    const answer = parse(prolog + base[id]);

    console.log(answer);
    setMessages(
      [
        ...messages,
        { isQuestion: true, text: question },
        { text: <MessageNode mmlNodes={answer} id={0}/> }
      ]
    );
  }
  const showMessage = (id: string)=> {
    const set = new Set(shownMessages);
    set.add(id);
    setShownMessages(set);
  }

  return (
    <Context.Provider value={{ createMessage, messages, showMessage, shownMessages }}>
      <div className={styles.wrapper}>
          <Chat />
      </div>
    </Context.Provider>
  );
}

export default App;
