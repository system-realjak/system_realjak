
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';

interface ChatBoxProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="absolute bottom-4 left-4 w-80 h-64 bg-black bg-opacity-60 rounded-lg shadow-xl flex flex-col p-2 backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto pr-2 chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="text-sm mb-1 break-words">
            <span className={`font-bold ${msg.color} ${msg.isUser ? 'text-blue-400' : ''}`}>
              {msg.sender}:
            </span>{' '}
            <span className={msg.color}>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
          className="w-full bg-gray-800 text-white rounded px-2 py-1 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
};
