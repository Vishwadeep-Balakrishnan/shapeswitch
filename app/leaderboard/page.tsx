import Leaderboard from '../components/Leaderboard';

// Sample data - replace with actual data from your API
const sampleEntries = [
  {
    username: "ShapeMaster",
    score: 15000,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShapeMaster",
    rank: 1
  },
  {
    username: "MemeQueen",
    score: 12500,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=MemeQueen",
    rank: 2
  },
  {
    username: "RoastKing",
    score: 10800,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=RoastKing",
    rank: 3
  },
  {
    username: "PixelPirate",
    score: 9500,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=PixelPirate",
    rank: 4
  },
  {
    username: "ByteBoss",
    score: 8200,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ByteBoss",
    rank: 5
  }
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Shape Masters
          </h1>
          <p className="mt-4 text-gray-400 text-lg">
            Top performers in identity transformation
          </p>
        </div>
        
        <Leaderboard entries={sampleEntries} />
      </div>
    </main>
  );
} 