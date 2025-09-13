import { createContext} from 'react';
import {Message} from "../../types/common";

export const Context = createContext({
    createMessage: (id: string, question: string) => { console.error('No context', id, question) },
    messages: new Array<Message>(),
    shownMessages: new Set<string>(),
    showMessage: (id: string) => { console.error('No context', id) }
});
