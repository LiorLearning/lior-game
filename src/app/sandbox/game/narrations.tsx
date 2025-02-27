interface Message {
  role: string;
  content: string;
  send: boolean;
}



export const narrations: { [key: string]: Message } = {
  Screen1Step0Message1: {
    role: 'agent',
    content: 'Can you help Tilo find ${a} times ${b}? Ready to begin?',
    send: true
  }
};