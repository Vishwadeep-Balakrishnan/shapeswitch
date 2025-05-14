'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import RoastCard from '../components/RoastCard';

interface RoastResponse {
  roast: string;
  voiceUrl?: string;
  mirrorScore: number;
}

export default function RoastPage() {
  const [target, setTarget] = useState('');
  const [roastResponse, setRoastResponse] = useState<RoastResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!target.trim()) {
      toast.error('Please enter a roast target');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      setRoastResponse({
        roast: "Your code is like a maze - confusing, poorly designed, and full of dead ends. Even a quantum computer would get lost trying to understand your logic!",
        mirrorScore: 8.5,
        voiceUrl: undefined // Will be implemented with actual API
      });
    } catch (error) {
      toast.error('Failed to generate roast');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-display bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            AI Roast Battle
          </h1>
          <p className="text-gray-400">
            Get roasted by our AI with style and wit
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="target" className="block text-sm font-medium text-gray-400">
              Who or what should we roast?
            </label>
            <input
              id="target"
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter your roast target..."
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !target.trim()}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating Roast...' : 'Generate Roast'}
          </button>
        </form>

        {isLoading && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}

        {roastResponse && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <RoastCard
              roast={roastResponse.roast}
              voiceUrl={roastResponse.voiceUrl}
              mirrorScore={roastResponse.mirrorScore}
            />
          </motion.div>
        )}
      </div>
    </main>
  );
} 