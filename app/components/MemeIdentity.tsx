import { useState } from 'react';
import { motion } from 'framer-motion';
import { MemePersonality } from '../config/memes';

interface MemeIdentityProps {
  meme: MemePersonality;
  isSelected: boolean;
  onSelect: () => void;
  isLoading?: boolean;
}

export default function MemeIdentity({
  meme,
  isSelected,
  onSelect,
  isLoading = false
}: MemeIdentityProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getMemeGradient = (id: string) => {
    const gradients: { [key: string]: string } = {
      'sad-girl-fall': 'from-amber-500/20 to-orange-600/20',
      'tech-bro': 'from-blue-500/20 to-cyan-600/20',
      'main-character': 'from-purple-500/20 to-pink-600/20',
      'gym-bro': 'from-red-500/20 to-orange-600/20',
      'plant-parent': 'from-green-500/20 to-emerald-600/20',
      'aesthetic-guru': 'from-pink-500/20 to-purple-600/20'
    };
    return gradients[id] || 'from-blue-500/20 to-purple-600/20';
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      className={`
        relative group cursor-pointer
        bg-black/30 rounded-xl p-6
        border transition-all duration-300
        ${isSelected 
          ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
          : 'border-gray-800 hover:border-gray-700'
        }
      `}
      onClick={onSelect}
    >
      {/* Background Gradient */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
        bg-gradient-to-br ${getMemeGradient(meme.id)}
        transition-opacity duration-300
      `} />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Emoji Avatar */}
        <motion.div 
          className="mb-4 mx-auto"
          animate={{ 
            rotate: isHovered ? [0, -5, 5, -5, 5, 0] : 0,
            scale: isHovered ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-gray-800">
            <span className="text-4xl filter drop-shadow-lg">
              {meme.emoji}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-center mb-2 font-display">
          {meme.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm text-center mb-6">
          {meme.description}
        </p>

        {/* Try Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className={`
            w-full px-4 py-2 rounded-lg
            bg-gradient-to-r ${getMemeGradient(meme.id)}
            border border-gray-700
            text-white font-medium
            transition-all duration-300
            flex items-center justify-center gap-2
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-600'}
          `}
          disabled={isLoading}
        >
          <span>{isLoading ? 'Loading...' : 'Try This'}</span>
          {isHovered && !isLoading && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-lg"
            >
              💥
            </motion.span>
          )}
        </motion.button>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black"
          >
            <span className="text-lg">✨</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 