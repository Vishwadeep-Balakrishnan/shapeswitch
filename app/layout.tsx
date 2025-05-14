import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ShapeProvider } from './context/ShapeContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShapeSwitch - AI Identity Transformations",
  description: "Transform your digital identity with AI-powered personality shapes",
};

const navigation = [
  { name: 'Create', href: '/create' },
  { name: 'Chat', href: '/chat' },
  { name: 'Meme Mode', href: '/meme-mode' },
  { name: 'Roast', href: '/roast' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-900 to-black text-white antialiased`}>
        <ShapeProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-gray-800 backdrop-blur-sm bg-black/30 sticky top-0 z-50">
              <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    ShapeSwitch
                  </Link>
                  <div className="hidden md:flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="md:hidden">
                  {/* Mobile menu button placeholder */}
                  <button className="text-gray-400 hover:text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </nav>
            </header>
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <footer className="border-t border-gray-800 py-6 backdrop-blur-sm bg-black/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
                Powered by Shapes API • Built with Next.js
              </div>
            </footer>
          </div>
        </ShapeProvider>
      </body>
    </html>
  );
}
