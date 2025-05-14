interface ShapeMessageProps {
  text: string;
  senderName: string;
  isUser: boolean;
  timestamp?: string; // Optional timestamp
  avatar?: string; // Optional avatar emoji
}

export default function ShapeMessage({
  text,
  senderName,
  isUser,
  timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  avatar = isUser ? '👤' : '🤖',
}: ShapeMessageProps) {
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`
        w-8 h-8 rounded-full flex-shrink-0
        flex items-center justify-center text-sm
        ${isUser 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600'
          : 'bg-gradient-to-br from-purple-500 to-purple-600'
        }
      `}>
        {avatar}
      </div>

      {/* Message Content */}
      <div className={`
        flex flex-col
        ${isUser ? 'items-end' : 'items-start'}
        max-w-[80%]
      `}>
        {/* Sender Name */}
        <div className="text-sm text-gray-400 mb-1">
          {senderName}
        </div>

        {/* Message Bubble */}
        <div className={`
          rounded-2xl px-4 py-2
          ${isUser
            ? 'bg-blue-500/10 text-blue-100 rounded-tr-none'
            : 'bg-purple-500/10 text-purple-100 rounded-tl-none'
          }
        `}>
          <p className="whitespace-pre-wrap break-words">{text}</p>
        </div>

        {/* Timestamp */}
        <div className="text-xs text-gray-500 mt-1">
          {timestamp}
        </div>
      </div>
    </div>
  );
} 