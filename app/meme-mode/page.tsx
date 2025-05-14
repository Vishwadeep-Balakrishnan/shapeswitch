'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const MEME_IDENTITIES = [
  {
    id: 'tech-bro',
    name: 'Tech Bro',
    emoji: '💻',
    description: 'Always talking about crypto, AI, and their startup ideas',
  },
  {
    id: 'sad-girl',
    name: 'Sad Girl Fall',
    emoji: '🥺',
    description: 'Posting aesthetic photos and Taylor Swift lyrics',
  },
  {
    id: 'gym-rat',
    name: 'Gym Rat',
    emoji: '💪',
    description: 'Protein shakes, PRs, and motivational quotes',
  },
  {
    id: 'foodie',
    name: 'Food Influencer',
    emoji: '🍜',
    description: 'Taking photos of every meal and using #foodporn',
  },
  {
    id: 'wanderlust',
    name: 'Travel Blogger',
    emoji: '✈️',
    description: 'Living that digital nomad life #wanderlust',
  },
];

export default function MemePage() {
  const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleIdentitySelect = async (id: string) => {
    setSelectedIdentity(id);
    setIsLoading(true);

    try {
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Identity updated successfully!');
    } catch (error) {
      toast.error('Failed to update identity');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-display bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Meme Mode
          </h1>
          <p className="text-gray-400">
            Choose your meme identity and start posting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MEME_IDENTITIES.map((identity) => (
            <motion.button
              key={identity.id}
              onClick={() => handleIdentitySelect(identity.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 rounded-xl border transition-all ${
                selectedIdentity === identity.id
                  ? 'bg-purple-500/20 border-purple-500/50'
                  : 'bg-black/30 border-white/10 hover:border-white/20'
              }`}
              disabled={isLoading}
            >
              <div className="text-4xl mb-4">{identity.emoji}</div>
              <h3 className="text-xl font-display text-white mb-2">
                {identity.name}
              </h3>
              <p className="text-sm text-gray-400">{identity.description}</p>
            </motion.button>
          ))}
        </div>

        {selectedIdentity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/30 border border-white/10 rounded-xl p-6 text-center"
          >
            <p className="text-gray-400">
              Selected identity:{' '}
              <span className="text-white">
                {MEME_IDENTITIES.find(i => i.id === selectedIdentity)?.name}
              </span>
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
} 