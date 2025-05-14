'use client';

import { useState, useEffect } from 'react';
import { Message } from '@/lib/shapes';
import { useShapeChat } from '@/app/hooks/useShapeChat';
import { toast } from 'sonner';

interface ShapeChatProps {
  shapeUsername: string;
  initialMessage?: string;
}

export default function ShapeChat({ shapeUsername, initialMessage = '' }: ShapeChatProps) {
  const { response, isLoading, error, sendMessage } = useShapeChat(shapeUsername);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  
  // Initialize with initial message if provided
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (response) {
      setMessages(prev => [...prev, response.message]);
    }
  }, [response]);

  const handleSendMessage = async (content: string) => {
    // Don't send empty messages
    if (!content.trim()) return;
    
    // Add user message to the chat
    setMessages(prev => [...prev, content]);
    setInputText(''); // Clear input after sending
    
    try {
      // Send message to shape
      await sendMessage([
        { role: 'user', content }
      ]);
    } catch (err) {
      // Display error using toast
      toast.error("Failed to send message");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="bg-black/20 rounded-xl border border-gray-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2">
        <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
          <span>{shapeUsername.charAt(0).toUpperCase()}</span>
        </div>
        <span className="font-medium">{shapeUsername}</span>
      </div>
      
      <div className="h-60 overflow-y-auto p-4 flex flex-col gap-3 bg-black/20">
        {messages.map((message, i) => (
          <div 
            key={i}
            className={`text-sm p-3 rounded max-w-[80%] ${
              i % 2 === 0 ? 'bg-gray-800 self-end' : 'bg-gray-700 self-start'
            }`}
          >
            {message}
          </div>
        ))}
        
        {isLoading && (
          <div className="self-start bg-gray-700 rounded p-3 text-sm">
            <span className="animate-pulse">...</span>
          </div>
        )}
        
        {error && (
          <div className="self-center bg-red-900/50 text-red-200 rounded p-3 text-sm">
            {typeof error === 'string' ? error : 'An error occurred'}
          </div>
        )}
      </div>
      
      {/* Input field with send button */}
      <form onSubmit={handleSubmit} className="border-t border-gray-700 p-3 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-black/30 text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-purple-500/50 text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-white px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 disabled:opacity-50 transition-all"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
} 