'use client';

import ShapeBattle from '../components/ShapeBattle';

export default function BattlePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Shape{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Battle
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Watch as two AI shapes engage in an epic conversation, taking turns to respond to each other's messages.
          Each shape maintains its unique personality throughout the battle.
        </p>
      </div>

      <ShapeBattle />
    </div>
  );
} 