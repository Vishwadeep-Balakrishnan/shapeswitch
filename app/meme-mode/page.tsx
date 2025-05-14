'use client';

import { useState } from 'react';
import { Message } from '@/lib/shapes';
import { useShapeChat } from '@/app/hooks/useShapeChat';
import { MEME_PERSONALITIES, MemePersonality } from '../config/memes';

export default function MemePage() {
  const [selectedMeme, setSelectedMeme] = useState<MemePersonality | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { sendMessage } = useShapeChat('shape-shifter');

  const handleTryMeme = async (meme: MemePersonality) => {
    setSelectedMeme(meme);
    setIsLoading(true);

    try {
      // Send the system prompt to set the personality
      const messages: Message[] = [
        {
          role: 'system',
          content: meme.systemPrompt
        },
        {
          role: 'user',
          content: 'Show me how you would respond to: "Hey, what\'s on your mind today?"'
        }
      ];

      await sendMessage(messages);
      setResponse(meme.sampleText);
    } catch (error) {
      console.error('Error setting meme personality:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">
          Choose Your{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Meme Identity
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Transform your AI personality into popular meme archetypes. Each identity comes with its own unique way of expressing itself.
        </p>
      </div>

      {/* Meme Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {MEME_PERSONALITIES.map((meme) => (
          <div
            key={meme.id}
            className={`
              relative group
              bg-black/30 border rounded-xl p-6
              transition-all duration-300
              ${selectedMeme?.id === meme.id 
                ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                : 'border-gray-800 hover:border-gray-700'
              }
            `}
          >
            {/* Emoji Avatar */}
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex items-center justify-center">
                <span className="text-4xl filter drop-shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  {meme.emoji}
                </span>
              </div>
            </div>

            {/* Title and Description */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">{meme.title}</h3>
              <p className="text-gray-400 text-sm">{meme.description}</p>
            </div>

            {/* Sample Text (shows when selected) */}
            {selectedMeme?.id === meme.id && response && (
              <div className="mb-6 p-3 bg-black/20 rounded-lg">
                <p className="text-sm text-gray-300 italic">{response}</p>
              </div>
            )}

            {/* Try Button */}
            <button
              onClick={() => handleTryMeme(meme)}
              disabled={isLoading}
              className={`
                w-full px-4 py-2 rounded-lg
                bg-gradient-to-r from-blue-500/20 to-purple-600/20
                border border-gray-700
                text-white font-medium
                transition-all duration-300
                ${isLoading 
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:from-blue-500/30 hover:to-purple-600/30 hover:border-gray-600 active:scale-95'
                }
              `}
            >
              {isLoading && selectedMeme?.id === meme.id ? 'Loading...' : 'Try This'}
            </button>

            {/* Hover Glow Effect */}
            <div className="
              absolute -inset-0.5
              bg-gradient-to-r from-blue-500 to-purple-600
              rounded-xl opacity-0 group-hover:opacity-20
              blur transition duration-300
            " />
          </div>
        ))}
      </div>
    </div>
  );
} 