'use client';

import { motion } from 'framer-motion';
import LeaderboardCard from './LeaderboardCard';

interface LeaderboardProps {
  entries: Array<{
    username: string;
    score: number;
    avatarUrl: string;
    rank: number;
  }>;
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Top 3 Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {entries.slice(0, 3).map((entry) => (
            <motion.div
              key={entry.username}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="transform hover:scale-105 transition-transform duration-200"
            >
              <LeaderboardCard entry={entry} />
            </motion.div>
          ))}
        </div>

        {/* Remaining Entries */}
        <div className="mt-8 space-y-4">
          {entries.slice(3).map((entry) => (
            <motion.div
              key={entry.username}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring" }}
              className="transform hover:scale-[1.02] transition-transform duration-200"
            >
              <LeaderboardCard entry={entry} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 