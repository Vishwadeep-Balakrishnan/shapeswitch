'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  avatar?: string;
  shapeName?: string;
  isTyping?: boolean;
}

export default function ChatBubble({
  message,
  isUser,
  timestamp,
  avatar = '🤖',
  shapeName = 'Shape',
  isTyping = false
}: ChatBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubbleRef.current) {
      bubbleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message]);

  const getShapeColor = (name: string) => {
    const colors: { [key: string]: string } = {
      'Shape': 'from-blue-500/20 to-purple-600/20',
      'RoastMaster': 'from-orange-500/20 to-red-600/20',
      'MemeQueen': 'from-pink-500/20 to-purple-600/20',
      'TechGuru': 'from-green-500/20 to-teal-600/20',
      'ArtisticSoul': 'from-indigo-500/20 to-blue-600/20'
    };
    return colors[name] || colors['Shape'];
  };

  return (
    <motion.div
      ref={bubbleRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[80%] gap-2`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className={`
            w-8 h-8 rounded-full 
            flex items-center justify-center
            bg-gradient-to-br ${getShapeColor(shapeName)}
            border border-gray-700
            ${isUser ? 'ml-2' : 'mr-2'}
          `}>
            <span className="text-sm">{avatar}</span>
          </div>
        </div>

        {/* Message Content */}
        <div className={`
          flex flex-col
          ${isUser ? 'items-end' : 'items-start'}
        `}>
          {/* Shape Name */}
          <span className="text-xs text-gray-400 mb-1">
            {isUser ? 'You' : shapeName}
          </span>

          {/* Message Bubble */}
          <div className={`
            relative group
            px-4 py-2 rounded-2xl
            ${isUser 
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-br-sm' 
              : 'bg-gradient-to-r ' + getShapeColor(shapeName) + ' rounded-bl-sm'
            }
            border border-gray-700/50
            transition-all duration-200
            hover:border-gray-600
          `}>
            {/* Message Text */}
            {isTyping ? (
              <div className="flex items-center gap-1 px-2 py-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            ) : (
              <p className="text-gray-100 text-sm md:text-base whitespace-pre-wrap break-words">
                {message}
              </p>
            )}

            {/* Timestamp */}
            {timestamp && (
              <span className="
                absolute bottom-0 
                ${isUser ? 'left-0 -translate-x-full pl-2' : 'right-0 translate-x-full pr-2'}
                text-xs text-gray-400
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
              ">
                {timestamp}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 