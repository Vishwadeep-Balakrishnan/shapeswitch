'use client';

import { useState, useEffect, useRef } from 'react';
import { Message } from '@/lib/shapes';
import { useShapeChat } from '@/app/hooks/useShapeChat';
import ChatBubble from './ChatBubble';

interface Shape {
  username: string;
  name: string;
  avatar: string;
  prompt: string;
}

interface BattleMessage {
  content: string;
  shapeName: string;
  avatar: string;
  timestamp: string;
}

const SHAPES: [Shape, Shape] = [
  {
    username: 'tech-bro-bot',
    name: 'Tech Bro',
    avatar: '🤖',
    prompt: "Roast my startup idea: a blockchain-powered toaster that mines crypto while making avocado toast."
  },
  {
    username: 'drama-queen',
    name: 'Drama Queen',
    avatar: '🎭',
    prompt: "OMG, I can't even with that idea! Let me tell you why it's literally the worst thing ever..."
  }
];

const DELAY_BETWEEN_MESSAGES = 2000; // 2 seconds
const MAX_TURNS = 5; // Each shape gets 5 turns

export default function ShapeBattle() {
  const [messages, setMessages] = useState<BattleMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize hooks for both shapes
  const shape1Chat = useShapeChat(SHAPES[0].username);
  const shape2Chat = useShapeChat(SHAPES[1].username);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, shape: Shape) => {
    setMessages(prev => [...prev, {
      content,
      shapeName: shape.name,
      avatar: shape.avatar,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const simulateConversation = async () => {
    setIsRunning(true);
    setMessages([]); // Clear previous conversation

    // Initial prompts
    addMessage(SHAPES[0].prompt, SHAPES[0]);
    
    await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_MESSAGES));
    
    addMessage(SHAPES[1].prompt, SHAPES[1]);

    // Main conversation loop
    for (let turn = 0; turn < MAX_TURNS; turn++) {
      setCurrentTurn(turn + 1);
      
      for (let shapeIndex = 0; shapeIndex < 2; shapeIndex++) {
        const currentShape = SHAPES[shapeIndex];
        const otherShape = SHAPES[1 - shapeIndex];
        const chatHook = shapeIndex === 0 ? shape1Chat : shape2Chat;

        try {
          // Get all previous messages in the format the API expects
          const messageHistory: Message[] = messages.map(msg => ({
            role: 'assistant',
            content: msg.content
          }));

          // Send the message history to the current shape
          await chatHook.sendMessage(messageHistory);

          if (chatHook.response) {
            // Add a delay before showing the response
            await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_MESSAGES));
            
            addMessage(chatHook.response, currentShape);
          }
        } catch (error) {
          console.error(`Error in turn ${turn}, shape ${currentShape.name}:`, error);
          addMessage("Sorry, I got distracted for a moment... 😅", currentShape);
        }
      }
    }

    setIsRunning(false);
  };

  return (
    <div className="flex flex-col space-y-4 max-w-4xl mx-auto">
      {/* Control Panel */}
      <div className="flex justify-between items-center p-4 bg-black/30 border border-gray-800 rounded-xl">
        <div className="text-sm text-gray-400">
          {isRunning ? `Turn ${currentTurn}/${MAX_TURNS}` : 'Ready to start'}
        </div>
        <button
          onClick={simulateConversation}
          disabled={isRunning}
          className={`
            px-6 py-2 rounded-lg
            bg-gradient-to-r from-blue-500 to-purple-600
            text-white font-medium
            transition-all duration-300
            ${isRunning 
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:opacity-90 active:scale-[0.98]'
            }
          `}
        >
          {isRunning ? 'Conversation in Progress...' : 'Start New Conversation'}
        </button>
      </div>

      {/* Messages Container */}
      <div className="h-[600px] overflow-y-auto p-4 space-y-4 bg-black/30 border border-gray-800 rounded-xl">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg.content}
            isUser={false}
            avatar={msg.avatar}
            shapeName={msg.shapeName}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
} 