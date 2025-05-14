'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  shape?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Implement API call
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: 'This is a placeholder response. API integration coming soon!',
        role: 'assistant',
        shape: 'Friendly Shape'
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, response]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to get response');
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-display bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Chat with Shapes
          </h1>
          <p className="text-gray-400">
            Have a conversation with our AI-powered shapes
          </p>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto p-4 bg-black/30 rounded-xl border border-white/10">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-xl ${
                  message.role === 'user'
                    ? 'bg-purple-500/20 text-purple-100'
                    : 'bg-blue-500/20 text-blue-100'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="text-sm text-gray-400 mb-1">{message.shape}</div>
                )}
                <p>{message.content}</p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-blue-500/20 rounded-xl p-4">
                <LoadingSpinner />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
} 