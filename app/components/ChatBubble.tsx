'use client';

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  avatar: string;
  shapeName: string;
  timestamp?: string;
}

export default function ChatBubble({
  message,
  isUser = false,
  avatar,
  shapeName,
  timestamp = new Date().toLocaleTimeString()
}: ChatBubbleProps) {
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-gray-800 flex items-center justify-center text-xl">
          {avatar}
        </div>
        <span className="text-xs text-gray-500">{shapeName}</span>
      </div>

      {/* Message Content */}
      <div className={`
        max-w-[80%] group
        ${isUser ? 'items-end' : 'items-start'}
      `}>
        <div className={`
          relative px-4 py-3 rounded-2xl
          ${isUser 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-none' 
            : 'bg-black/30 border border-gray-800 text-gray-100 rounded-tl-none'
          }
        `}>
          <p className="text-sm">{message}</p>
          
          {/* Timestamp */}
          <div className={`
            absolute bottom-1 ${isUser ? 'left-2' : 'right-2'}
            opacity-0 group-hover:opacity-100 transition-opacity
            text-[10px] ${isUser ? 'text-blue-200' : 'text-gray-500'}
          `}>
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
} 