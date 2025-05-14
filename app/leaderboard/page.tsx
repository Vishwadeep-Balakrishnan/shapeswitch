'use client';

import { useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  mirrorScore: number;
  roasts: number;
  topRoast: string;
}

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "ShapeShifterPro",
    mirrorScore: 9.8,
    roasts: 156,
    topRoast: "Your code is like a maze - confusing, poorly designed, and full of dead ends."
  },
  {
    rank: 2,
    username: "RoastMaster3000",
    mirrorScore: 9.5,
    roasts: 142,
    topRoast: "You're the human equivalent of a loading screen - all promise, no delivery."
  },
  {
    rank: 3,
    username: "QuantumQuipster",
    mirrorScore: 9.2,
    roasts: 128,
    topRoast: "Your personality has more bugs than your code, and that's saying something."
  },
  {
    rank: 4,
    username: "ByteBurner",
    mirrorScore: 8.9,
    roasts: 115,
    topRoast: "You're like a poorly optimized algorithm - taking up space and wasting everyone's time."
  },
  {
    rank: 5,
    username: "CyberSage",
    mirrorScore: 8.7,
    roasts: 98,
    topRoast: "Your debugging skills are like your social skills - nonexistent."
  },
  {
    rank: 6,
    username: "NeuralNinja",
    mirrorScore: 8.5,
    roasts: 87,
    topRoast: "You're the human equivalent of a null pointer - empty and causing problems."
  },
  {
    rank: 7,
    username: "AIArtisan",
    mirrorScore: 8.3,
    roasts: 76,
    topRoast: "Your commit messages are like your life choices - brief and questionable."
  },
  {
    rank: 8,
    username: "TechTitan",
    mirrorScore: 8.1,
    roasts: 65,
    topRoast: "You're like a legacy codebase - outdated and resistant to change."
  }
];

export default function LeaderboardPage() {
  const [selectedEntry, setSelectedEntry] = useState<LeaderboardEntry | null>(null);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Roast Masters
          </h1>
          <p className="text-gray-400">
            The most savage shape-shifters ranked by their Mirror Scores
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-black/30 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-black/20">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Mirror Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400 hidden sm:table-cell">Roasts</th>
                </tr>
              </thead>
              <tbody>
                {mockLeaderboardData.map((entry, index) => (
                  <tr
                    key={entry.username}
                    onClick={() => setSelectedEntry(entry)}
                    className={`
                      border-b border-gray-800/50 last:border-0
                      transition-colors duration-200
                      cursor-pointer
                      ${selectedEntry?.username === entry.username ? 'bg-blue-500/10' : 'hover:bg-white/5'}
                      ${index < 3 ? 'bg-gradient-to-r from-black/0 to-purple-500/5' : ''}
                    `}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {index < 3 ? (
                          <span className="text-xl">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </span>
                        ) : (
                          <span className="text-gray-500 font-mono">{entry.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-white">{entry.username}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-semibold">{entry.mirrorScore}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(entry.mirrorScore / 2)
                                  ? 'text-blue-500'
                                  : 'text-gray-700'
                              }`}
                            >
                              ⚡
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-gray-400">{entry.roasts}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Entry Details */}
        {selectedEntry && (
          <div className="bg-black/30 border border-gray-800 rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{selectedEntry.username}</h3>
                <p className="text-gray-400 text-sm">Rank #{selectedEntry.rank}</p>
              </div>
              <div className="text-right">
                <div className="text-blue-400 font-semibold text-xl">{selectedEntry.mirrorScore}</div>
                <p className="text-gray-400 text-sm">{selectedEntry.roasts} roasts</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Top Roast</h4>
              <p className="text-gray-200 italic">"{selectedEntry.topRoast}"</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 