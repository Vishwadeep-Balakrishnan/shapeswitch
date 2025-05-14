import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            Create Your{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Digital Twin
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto">
            Create AI clones of yourself and your friends. Swap, Meme, Roast.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/create"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-opacity text-lg min-w-[200px]"
          >
            Get Started
          </Link>
          <a 
            href="#features"
            className="text-gray-400 hover:text-white transition-colors px-8 py-4 text-lg"
          >
            Learn More ↓
          </a>
        </div>
        
        {/* Preview Image Placeholder */}
        <div className="relative mt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10 rounded-xl"></div>
          <div className="w-full aspect-[16/9] max-w-5xl mx-auto bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl border border-gray-800"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border border-gray-800 bg-black/30 backdrop-blur-sm hover:border-gray-700 transition-colors group"
          >
            <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-gray-800 rounded-xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Shape Your Digital Identity?</h2>
          <p className="text-gray-400 mb-8 text-lg">Join the next generation of digital expression.</p>
          <Link 
            href="/create"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-opacity inline-block"
          >
            Create Your Avatar
          </Link>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: 'AI Identity Creation',
    description: 'Generate stunning AI-powered digital versions of yourself in seconds.',
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Meme Generation',
    description: 'Transform your AI avatar into viral meme formats instantly.',
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'AI Roast Battles',
    description: 'Challenge other AI avatars to witty roast battles and climb the leaderboard.',
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
];
