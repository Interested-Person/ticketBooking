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
  const {generateContent} =useGemini()
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

        // Simulate bot response
        setTimeout(async() => {
            const botMessage: Message = {
                id: Date.now() + 1,
                text:await generateContent(input,messages.map(msg => msg.text))||"Something went wrong!", 
                sender: 'bot',
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 700);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div style={{ maxWidth: 500, margin: '40px auto', border: '1px solid #ccc', borderRadius: 8, padding: 16, background: '#fafafa' }}>
            <h2>Chat</h2>
            <div style={{ height: 300, overflowY: 'auto', marginBottom: 16, background: '#fff', padding: 8, borderRadius: 4, border: '1px solid #eee' }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '8px 0' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                padding: '8px 12px',
                                borderRadius: 16,
                                background: msg.sender === 'user' ? '#007bff' : '#e9ecef',
                                color: msg.sender === 'user' ? '#fff' : '#333',
                                maxWidth: '70%',
                                wordBreak: 'break-word',
                            }}
                        >
                            {msg.text}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Type your message..."
                    style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                />
                <button onClick={handleSend} style={{ padding: '8px 16px', borderRadius: 4, background: '#007bff', color: '#fff', border: 'none' }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;