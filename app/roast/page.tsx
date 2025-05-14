'use client';

import { useState, useRef } from 'react';
import RoastCard from '../components/RoastCard';
import { chatWithShape } from '../lib/shapes';
import html2canvas from 'html2canvas';

export default function RoastPage() {
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [roastResponse, setRoastResponse] = useState<{
    text: string;
    voiceUrl?: string;
    mirrorScore?: number;
  } | null>(null);
  
  const roastCardRef = useRef<HTMLDivElement>(null);

  const handleRoastRequest = async () => {
    setLoading(true);
    try {
      const response = await chatWithShape({
        message: "Roast me based on my personality. Be brutally honest but funny.",
        systemPrompt: "You are a witty roast master AI. Your roasts are creative, clever, and hit close to home while still being entertaining. You specialize in personality-based roasts that reveal uncomfortable truths in a humorous way."
      });

      // For now, we'll generate a random mirror score between 1-5
      const mockMirrorScore = Math.floor(Math.random() * 5) + 1;

      setRoastResponse({
        text: response.message,
        voiceUrl: response.voiceUrl,
        mirrorScore: mockMirrorScore
      });
    } catch (error) {
      console.error('Error getting roast:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!roastCardRef.current) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(roastCardRef.current, {
        backgroundColor: '#000000',
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true
      });

      // Create download link
      const link = document.createElement('a');
      link.download = 'shapeswitch-roast.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Get Roasted
          </h1>
          <p className="text-gray-400">
            Ready to face the brutal honesty of an AI roast master?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleRoastRequest}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg border border-gray-700 hover:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Preparing Roast...' : 'Roast Me'}
          </button>
        </div>

        {roastResponse && (
          <div className="space-y-4">
            <div className="mt-8">
              <RoastCard
                ref={roastCardRef}
                roast={roastResponse.text}
                voiceUrl={roastResponse.voiceUrl}
                mirrorScore={roastResponse.mirrorScore}
              />
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleDownloadImage}
                disabled={downloading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-600/20 rounded-lg border border-gray-700 hover:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg">📸</span>
                <span>{downloading ? 'Generating...' : 'Download as Image'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 