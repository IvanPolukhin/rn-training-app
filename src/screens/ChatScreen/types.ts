export type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export type MessageItemProps = {
  message: Message;
};

export type InputAreaProps = {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
};
