import React from 'react';
import {Chat} from "./components/Chat/Chat";
import {Context} from "./components/Context/Context";
import {base} from "./base";
import {Message} from "./types/common";
import styles from './App.module.css';

function App() {
  const [messages, setMessages] = React.useState<Message[]>([]);

  const createMessage = (id: string, question: string) => {
      setMessages([...messages, { isQuestion: true, text: question }, { text: base[id] }]);
  }

  return (
    <Context.Provider value={{ createMessage, messages }}>
      <div className={styles.wrapper}>
          <Chat />
      </div>
    </Context.Provider>
  );
}

export default App;
