import { useState } from 'react';
import { chatWithShape, ChatRequest, ChatResponse } from '../../lib/shapes';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

export function useShapeChat(shapeId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ChatResponse | null>(null);

  const sendMessage = async (messages: Message[]): Promise<ChatResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Extract the message content from the last message
      const userMessage = messages[messages.length - 1].content;
      
      // Find a system message if available
      const systemPrompt = messages.find(m => m.role === 'system')?.content;
      
      // Send the message to the API with the shape ID
      const responseData = await chatWithShape({
        message: userMessage,
        systemPrompt,
        shapeId // Include the shape ID in the request
      });

      setResponse(responseData);
      return responseData;
    } catch (err) {
      // Create a friendly error message for display
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      
      // Show a toast for better user feedback
      toast.error(errorMessage);
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    response,
    sendMessage,
    isLoading,
    error
  };
} 