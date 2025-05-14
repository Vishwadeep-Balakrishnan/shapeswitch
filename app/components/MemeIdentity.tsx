import { useShape } from '../context/ShapeContext';

interface MemeIdentityProps {
  emoji: string;
  name: string;
  sampleText: string;
  onTryClick?: () => void;
  isActive?: boolean;
}

export default function MemeIdentity({
  emoji,
  name,
  sampleText,
  onTryClick,
  isActive = false
}: MemeIdentityProps) {
  const { updateShape } = useShape();

  const handleTryClick = () => {
    updateShape({
      shapeName: name,
      sampleText,
      mirrorScore: 0, // This will be updated when actual roasts are generated
      roastText: '',
      voiceUrl: '',
    });
    
    if (onTryClick) {
      onTryClick();
    }
  };

  return (
    <div className="relative group">
      {/* Card Container */}
      <div 
        className={`
          bg-black/30 border rounded-xl p-6
          transition-all duration-300
          ${isActive 
            ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
            : 'border-gray-800 group-hover:border-gray-700'
          }
        `}
      >
        {/* Emoji Avatar */}
        <div className="mb-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex items-center justify-center">
            <span className="text-4xl filter drop-shadow-lg transform transition-transform duration-300 group-hover:scale-110">
              {emoji}
            </span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-center text-lg font-medium text-white mb-2">
          {name}
        </h3>

        {/* Sample Text */}
        <p className="text-center text-sm text-gray-400 mb-4 line-clamp-2">
          {sampleText}
        </p>

        {/* Try Button */}
        <button
          onClick={handleTryClick}
          className="
            w-full px-4 py-2 rounded-lg
            bg-gradient-to-r from-blue-500/20 to-purple-600/20
            border border-gray-700
            text-white font-medium
            transition-all duration-300
            hover:from-blue-500/30 hover:to-purple-600/30
            hover:border-gray-600
            active:scale-95
          "
        >
          Try This
        </button>
      </div>

      {/* Hover Glow Effect */}
      <div className="
        absolute -inset-0.5
        bg-gradient-to-r from-blue-500 to-purple-600
        rounded-xl opacity-0 group-hover:opacity-20
        blur transition duration-300
      " />
    </div>
  );
} 