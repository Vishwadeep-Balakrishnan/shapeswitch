'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/lib/shapes';
import { useShapeChat } from '@/app/hooks/useShapeChat';
import ChatBubble from '@/app/components/ChatBubble';

// Define our two shapes
const SHAPE_1 = {
  username: 'tech-bro-bot',
  avatar: '🤖',
  name: 'Tech Bro'
};

const SHAPE_2 = {
  username: 'drama-queen',
  avatar: '🎭',
  name: 'Drama Queen'
};

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: string;
  shapeName: string;
  avatar: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize hooks for both shapes
  const shape1Chat = useShapeChat(SHAPE_1.username);
  const shape2Chat = useShapeChat(SHAPE_2.username);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || shape1Chat.isLoading || shape2Chat.isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      content: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
      shapeName: 'You',
      avatar: '👤'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Prepare message for the shapes
    const messageForShapes: Message[] = [
      { role: 'user', content: inputText }
    ];

    try {
      // Send messages to both shapes simultaneously
      await Promise.all([
        shape1Chat.sendMessage(messageForShapes),
        shape2Chat.sendMessage(messageForShapes)
      ]);

      // Add responses if they exist
      if (shape1Chat.response) {
        setMessages(prev => [...prev, {
          content: shape1Chat.response!,
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
          shapeName: SHAPE_1.name,
          avatar: SHAPE_1.avatar
        }]);
      }

      if (shape2Chat.response) {
        setMessages(prev => [...prev, {
          content: shape2Chat.response!,
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
          shapeName: SHAPE_2.name,
          avatar: SHAPE_2.avatar
        }]);
      }
    } catch (error) {
      console.error('Error getting responses:', error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Chat Header */}
      <div className="border-b border-gray-800 p-4 backdrop-blur-sm bg-black/30">
        <h1 className="text-xl font-bold text-center">
          Shape Chat: {SHAPE_1.name} vs {SHAPE_2.name}
        </h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg.content}
            isUser={msg.isUser}
            avatar={msg.avatar}
            shapeName={msg.shapeName}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4 backdrop-blur-sm bg-black/30">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-black/30 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            disabled={shape1Chat.isLoading || shape2Chat.isLoading}
          />
          <button
            type="submit"
            disabled={shape1Chat.isLoading || shape2Chat.isLoading || !inputText.trim()}
            className={`
              px-6 py-2 rounded-lg
              bg-gradient-to-r from-blue-500 to-purple-600
              text-white font-medium
              transition-all duration-300
              ${(shape1Chat.isLoading || shape2Chat.isLoading || !inputText.trim())
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:opacity-90 active:scale-[0.98]'
              }
            `}
          >
            {shape1Chat.isLoading || shape2Chat.isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
} 