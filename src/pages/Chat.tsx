import React, { useState, useRef, useEffect } from 'react';
import { useGemini } from '../hooks/useGemini';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { generateContent } = useGemini();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            sender: 'user',
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        setTimeout(async () => {
            const botMessage: Message = {
                id: Date.now() + 1,
                text: await generateContent(input, messages.map(msg => msg.text)) || "Something went wrong!",
                sender: 'bot',
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 700);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="h-[calc(100vh-4rem)] w-screen flex flex-col p-4 bg-sky-900">
            <div className="flex-1 overflow-y-auto space-y-2">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`px-4 py-2 rounded-2xl max-w-[70%] break-words ${
                                msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="mt-4 text-white flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none"
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
