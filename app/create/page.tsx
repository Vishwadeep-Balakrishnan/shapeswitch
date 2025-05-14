'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';

export default function CreatePage() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error('Please enter some text');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement API call
      toast.success('Shape created successfully!');
    } catch (error) {
      toast.error('Failed to create shape');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-display bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Create Your Shape
          </h1>
          <p className="text-gray-400">
            Paste your text below and watch it transform into a unique shape
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-48 px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none text-white placeholder-gray-500"
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-xl">
                <LoadingSpinner />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Create Shape'}
          </button>
        </form>
      </div>
    </main>
  );
} 