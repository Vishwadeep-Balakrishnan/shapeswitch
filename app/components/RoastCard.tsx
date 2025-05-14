import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface RoastCardProps {
  roast: string;
  voiceUrl?: string;
  mirrorScore?: number;
}

const ROAST_EMOJIS = ['🔥', '💀', '😬', '☠️', '⚰️', '🎭'];

export default function RoastCard({ roast, voiceUrl, mirrorScore = 0 }: RoastCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [randomEmoji] = useState(() => 
    ROAST_EMOJIS[Math.floor(Math.random() * ROAST_EMOJIS.length)]
  );

  useEffect(() => {
    if (voiceUrl && audioRef.current) {
      audioRef.current.src = voiceUrl;
      audioRef.current.load();
    }
  }, [voiceUrl]);

  const handlePlayVoice = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(roast);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy roast:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 border border-gray-800 rounded-xl overflow-hidden"
    >
      {/* Header with Mirror Score */}
      <div className="border-b border-gray-800/50 p-4 flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{randomEmoji}</span>
          <div>
            <h3 className="font-display text-lg text-white">Savage Roast</h3>
            <p className="text-sm text-gray-400">Powered by ShapeSwitch</p>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-3 py-1 flex items-center gap-1"
        >
          <span className="text-sm font-semibold">Mirror Score</span>
          <span className="text-lg font-bold">{mirrorScore.toFixed(1)}</span>
        </motion.div>
      </div>

      {/* Roast Content */}
      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -left-2 top-0 text-4xl text-gray-600 opacity-50">"</div>
          <div className="absolute -right-2 bottom-0 text-4xl text-gray-600 opacity-50">"</div>
          <p className="text-xl md:text-2xl font-display text-center px-6 py-4 text-gray-100 leading-relaxed">
            {roast}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          {voiceUrl ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayVoice}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-600/20 rounded-lg border border-gray-700 hover:border-gray-600 transition-all group"
            >
              <span className="text-lg transform transition-transform group-hover:scale-110">🔊</span>
              <span className="text-sm text-gray-300">Play Voice</span>
            </motion.button>
          ) : (
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 opacity-60"
            >
              <span className="text-lg">🔇</span>
              <span className="text-sm text-gray-400">Voice not available</span>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -3, 3, -3, 3, 0] }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg border border-gray-700 hover:border-gray-600 transition-all group"
          >
            <span className="text-lg transform transition-transform group-hover:scale-110">📋</span>
            <span className="text-sm text-gray-300">Copy & Share</span>
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800/50 p-4 bg-black/20">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Share this roast with friends</span>
          <motion.span 
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.2, 1.2, 1.2, 1.2, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="text-xl"
          >
            {randomEmoji}
          </motion.span>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} className="hidden" />
    </motion.div>
  );
} 