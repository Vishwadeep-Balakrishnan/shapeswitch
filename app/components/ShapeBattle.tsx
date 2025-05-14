'use client';

import { useState, useEffect, useRef } from 'react';
import { useShapeChat } from '../hooks/useShapeChat';
import { Message, ChatResponse } from '../lib/shapes';
import ChatBubble from './ChatBubble';

interface Shape {
  id: string;
  name: string;
  avatar: string;
  systemPrompt: string;
  color?: string;
}

interface BattleMessage {
  id: string;
  content: string;
  shapeName: string;
  avatar: string;
  timestamp: string;
}

const SHAPES: Shape[] = [
  {
    id: 'wise-owl',
    name: 'Wise Owl',
    avatar: '🦉',
    systemPrompt: 'You are Wise Owl, an ancient and knowledgeable creature. You speak in a calm, measured tone, often including profound wisdom and literary references.',
    color: 'blue'
  },
  {
    id: 'sarcastic-cat',
    name: 'Sarcastic Cat',
    avatar: '😼',
    systemPrompt: 'You are Sarcastic Cat, a witty and cynical feline. You speak with dry humor, sarcasm, and occasional disdain for everything.',
    color: 'purple'
  }
];

const DELAY_BETWEEN_MESSAGES = 1500;

export default function ShapeBattle() {
  const [messages, setMessages] = useState<BattleMessage[]>([]);
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get the current shape
  const currentShape = SHAPES[currentShapeIndex];
  
  // Initialize chat hook
  const chatHook = useShapeChat(currentShape.id);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (response: ChatResponse, shape: Shape) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: response.message,
      shapeName: shape.name,
      avatar: shape.avatar,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const startConversation = async () => {
    if (!topic.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setIsStarted(true);
    setMessages([]);
    
    try {
      // Start with the first shape
      const firstPrompt = `Let's talk about ${topic}. Share your thoughts in a few sentences.`;
      
      const result = await chatHook.sendMessage([
        { role: 'system', content: currentShape.systemPrompt },
        { role: 'user', content: firstPrompt }
      ]);
      
      addMessage(result, currentShape);
      
      // Switch to the next shape
      setCurrentShapeIndex((prev) => (prev + 1) % SHAPES.length);
    } catch (error) {
      console.error("Error starting conversation:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const continueConversation = async () => {
    if (!isStarted || isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      // Get the previous message
      const lastMessage = messages[messages.length - 1];
      
      if (!lastMessage) return;
      
      // Create message history
      const messageHistory = [
        { role: 'system' as const, content: currentShape.systemPrompt },
        { role: 'user' as const, content: lastMessage.content }
      ];
      
      // Send the message history to the current shape
      const result = await chatHook.sendMessage(messageHistory);
      
      // Add a delay before showing the response
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_MESSAGES));
      
      addMessage(result, currentShape);
      
      // Switch to the next shape
      setCurrentShapeIndex((prev) => (prev + 1) % SHAPES.length);
    } catch (error) {
      console.error("Error continuing conversation:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {!isStarted ? (
        <div className="p-6 bg-black/30 border border-gray-800 rounded-xl space-y-4">
          <h3 className="text-xl font-semibold">Start a Shape Battle</h3>
          <p className="text-gray-400">
            Enter a topic and watch as our Shapes debate and discuss it with their unique personalities.
          </p>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic..."
              className="flex-1 px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white"
            />
            <button
              onClick={startConversation}
              disabled={!topic.trim() || isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg border border-gray-700 hover:border-gray-600 transition-all disabled:opacity-50"
            >
              {isGenerating ? 'Starting...' : 'Start Battle'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              Battle Topic: <span className="text-blue-400">{topic}</span>
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Next up:</span>
              <div className="flex items-center gap-1">
                <span>{currentShape.avatar}</span>
                <span className="text-sm font-medium">{currentShape.name}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-black/30 border border-gray-800 rounded-xl h-[400px] overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center">
                  <span className="text-xl">{msg.avatar}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium">{msg.shapeName}</span>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-gray-300">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isGenerating && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center">
                  <span className="text-xl">{currentShape.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium">{currentShape.name}</span>
                  </div>
                  <div className="text-gray-400">
                    <span className="inline-block animate-bounce">.</span>
                    <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                    <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={continueConversation}
              disabled={isGenerating}
              className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg border border-gray-700 hover:border-gray-600 transition-all disabled:opacity-50"
            >
              {isGenerating ? 'Thinking...' : 'Continue Conversation'}
            </button>
          </div>
        </>
      )}
    </div>
  );
} 