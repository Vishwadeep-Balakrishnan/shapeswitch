import { useState, useCallback } from 'react';
import { chatWithShape, Message } from '@/lib/shapes';

interface UseShapeChatResult {
  response: string | null;
  isLoading: boolean;
  error: Error | null;
  sendMessage: (messages: Message[]) => Promise<void>;
  reset: () => void;
}

export function useShapeChat(shapeUsername: string): UseShapeChatResult {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(async (messages: Message[]) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const shapeResponse = await chatWithShape(shapeUsername, messages);
      setResponse(shapeResponse);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to chat with shape'));
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }, [shapeUsername]);

  const reset = useCallback(() => {
    setResponse(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    response,
    isLoading,
    error,
    sendMessage,
    reset
  };
} 