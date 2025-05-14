'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Log to error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4 text-center">
        <div className="text-4xl">😅</div>
        <h2 className="text-2xl font-display text-white">Something went wrong</h2>
        <p className="text-gray-400">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg border border-purple-500/50 text-purple-300 transition-colors"
          >
            Try again
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-black/20 hover:bg-black/30 rounded-lg border border-white/10 text-gray-300 transition-colors"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
} 