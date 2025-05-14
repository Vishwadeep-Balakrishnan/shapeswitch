import { useEffect, useRef, forwardRef } from 'react';

interface RoastCardProps {
  roast: string;
  voiceUrl?: string;
  mirrorScore?: number;
}

const RoastCard = forwardRef<HTMLDivElement, RoastCardProps>(
  ({ roast, voiceUrl, mirrorScore = 0 }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
      if (voiceUrl && audioRef.current) {
        audioRef.current.src = voiceUrl;
        audioRef.current.load();
      }
    }, [voiceUrl]);

    const handlePlayVoice = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    return (
      <div 
        ref={ref}
        className="bg-black/30 border border-gray-800 rounded-xl p-6 max-w-2xl mx-auto relative overflow-hidden"
        style={{
          backgroundColor: 'rgb(0, 0, 0, 0.3)', // Ensure background is visible in export
          minHeight: '200px'
        }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10">
          {/* Mirror Score */}
          {mirrorScore > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-400">Mirror Score:</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < mirrorScore ? 'text-blue-500' : 'text-gray-700'
                    }`}
                  >
                    ⚡
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Roast Text */}
          <p className="text-lg text-gray-200 mb-4 leading-relaxed">{roast}</p>

          {/* Voice Playback */}
          {voiceUrl && (
            <div>
              <audio ref={audioRef} className="hidden" />
              <button
                onClick={handlePlayVoice}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg border border-gray-700 hover:border-gray-600 transition-all"
              >
                <span className="text-lg">🔊</span>
                <span className="text-sm text-gray-300">Play Voice</span>
              </button>
            </div>
          )}

          {/* Watermark */}
          <div className="absolute bottom-2 right-3 text-gray-600 text-xs opacity-50">
            ShapeSwitch
          </div>
        </div>
      </div>
    );
  }
);

RoastCard.displayName = 'RoastCard';

export default RoastCard; 