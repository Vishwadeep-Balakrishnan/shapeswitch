'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LeaderboardEntry {
  username: string;
  score: number;
  avatarUrl: string;
  rank: number;
}

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
}

const getRankTheme = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        gradient: 'from-amber-500 to-yellow-500',
        shadow: 'shadow-amber-500/20',
        badge: '👑',
        label: 'Gold'
      };
    case 2:
      return {
        gradient: 'from-slate-300 to-slate-400',
        shadow: 'shadow-slate-400/20',
        badge: '🥈',
        label: 'Silver'
      };
    case 3:
      return {
        gradient: 'from-amber-700 to-amber-800',
        shadow: 'shadow-amber-800/20',
        badge: '🥉',
        label: 'Bronze'
      };
    default:
      return {
        gradient: 'from-purple-500/10 to-blue-500/10',
        shadow: 'shadow-blue-500/10',
        badge: '🎯',
        label: `#${rank}`
      };
  }
};

export default function LeaderboardCard({ entry }: LeaderboardCardProps) {
  const theme = getRankTheme(entry.rank);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative w-full bg-gradient-to-r ${theme.gradient} rounded-xl overflow-hidden ${theme.shadow} shadow-lg`}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative p-4 flex items-center gap-4">
        {/* Rank Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-black/30 flex items-center justify-center"
        >
          <span className="text-2xl">{theme.badge}</span>
        </motion.div>

        {/* Avatar */}
        <div className="relative flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-white/10">
          <Image
            src={entry.avatarUrl}
            alt={entry.username}
            fill
            className="object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-grow min-w-0">
          <h3 className="font-display text-lg text-white truncate">
            {entry.username}
          </h3>
          <p className="text-sm text-gray-300">
            {theme.label} • Score: {entry.score.toLocaleString()}
          </p>
        </div>

        {/* Score Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-shrink-0 bg-black/30 rounded-full px-4 py-2"
        >
          <span className="font-display text-xl text-white">
            {entry.score.toLocaleString()}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
} 