'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { 
  HomeIcon, 
  ChatBubbleLeftRightIcon, 
  FaceSmileIcon, 
  FireIcon, 
  TrophyIcon 
} from '@heroicons/react/24/outline';

const routes = [
  { name: 'Create', path: '/create', icon: HomeIcon },
  { name: 'Chat', path: '/chat', icon: ChatBubbleLeftRightIcon },
  { name: 'Meme Mode', path: '/meme-mode', icon: FaceSmileIcon },
  { name: 'Roast', path: '/roast', icon: FireIcon },
  { name: 'Leaderboard', path: '/leaderboard', icon: TrophyIcon },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-display bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                ShapeSwitch
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:block">
            <div className="flex items-center space-x-4">
              {routes.map(({ name, path, icon: Icon }) => (
                <Link
                  key={path}
                  href={path}
                  className={clsx(
                    'px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors',
                    pathname === path
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-lg border-t border-white/10">
        <div className="grid grid-cols-5 gap-1 p-2">
          {routes.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              href={path}
              className={clsx(
                'flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs gap-1 transition-colors',
                pathname === path
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="truncate">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 