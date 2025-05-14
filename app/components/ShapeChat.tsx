'use client';

import { useState } from 'react';
import { Message } from '@/lib/shapes';
import { useShapeChat } from '@/app/hooks/useShapeChat';

interface ShapeChatProps {
  shapeUsername: string;
  initialMessage?: string;
}

export default function ShapeChat({ shapeUsername, initialMessage = '' }: ShapeChatProps) {
  const [messageText, setMessageText] = useState(initialMessage);
  const { response, isLoading, error, sendMessage } = useShapeChat(shapeUsername);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || isLoading) return;

    const messages: Message[] = [
      {
        role: 'user',
        content: messageText
      }
    ];

    await sendMessage(messages);
    setMessageText(''); // Clear input after sending
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
          {error.message}
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div className="p-6 bg-black/30 border border-gray-800 rounded-xl">
          <p className="text-white">{response}</p>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder={`Chat with ${shapeUsername}...`}
          className="
            w-full p-4 rounded-lg
            bg-black/30 border border-gray-800
            text-white placeholder-gray-500
            focus:outline-none focus:border-blue-500
            transition-colors
          "
          rows={3}
          disabled={isLoading}
        />
        
        <button
          type="submit"
          disabled={isLoading || !messageText.trim()}
          className={`
            w-full px-6 py-3 rounded-lg
            bg-gradient-to-r from-blue-500 to-purple-600
            text-white font-medium
            transition-all duration-300
            ${isLoading || !messageText.trim() 
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:opacity-90 active:scale-[0.98]'
            }
          `}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
} 