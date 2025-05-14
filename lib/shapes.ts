import OpenAI from 'openai';
import { ENV } from './env';

// Runtime check for SHAPESINC_API_KEY
(() => {
  const apiKey = process.env.SHAPESINC_API_KEY;
  
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[DEBUG] SHAPESINC_API_KEY type:', typeof apiKey);
    console.log('[DEBUG] SHAPESINC_API_KEY value:', apiKey ? `${apiKey.substring(0, 3)}...${apiKey.length > 6 ? apiKey.substring(apiKey.length - 3) : ''}` : apiKey);
  }
  
  // Strict validation - throw error if not a non-empty string
  if (typeof apiKey !== 'string') {
    throw new Error(`SHAPESINC_API_KEY must be a string, received: ${typeof apiKey}`);
  }
  
  if (apiKey.trim() === '') {
    throw new Error('SHAPESINC_API_KEY cannot be an empty string');
  }
})();

// Double-check API key (additional safety check)
const apiKey = ENV.SHAPESINC_API_KEY;
if (!apiKey && process.env.NODE_ENV === 'production') {
  console.error('CRITICAL: SHAPESINC_API_KEY is required for API calls in production');
} else if (apiKey && (typeof apiKey !== 'string' || apiKey.trim() === '')) {
  console.error('CRITICAL: SHAPESINC_API_KEY must be a non-empty string');
}

// Initialize the OpenAI-compatible client with Shapes API configuration
const shapesClient = new OpenAI({
  apiKey: typeof ENV.SHAPESINC_API_KEY === 'string' && ENV.SHAPESINC_API_KEY.trim() !== '' 
    ? ENV.SHAPESINC_API_KEY 
    : 'placeholder-key-for-development',
  baseURL: ENV.SHAPES_API_URL,
});

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  systemPrompt?: string;
  shapeId?: string; // Optional shape identifier
}

export interface ChatResponse {
  message: string;
  voiceUrl?: string;
}

/**
 * Send a message to a shape and get its response
 */
export async function chatWithShape(request: ChatRequest): Promise<ChatResponse> {
  try {
    // Validate required fields
    if (!request.message) {
      throw new Error('Message is required');
    }

    // In development or if API key is missing, return a mock response
    if (!ENV.SHAPESINC_API_KEY || ENV.IS_DEVELOPMENT) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // If in development, add some randomness to make testing more interesting
      const responses = [
        `This is a mock response to: "${request.message}"`,
        `Interesting point about "${request.message.slice(0, 20)}..." - I'd need to think more about that.`,
        `As an AI shape, I find "${request.message.slice(0, 15)}..." to be quite fascinating!`, 
        `Let me respond to "${request.message.slice(0, 10)}..." with some careful consideration.`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      return {
        message: request.shapeId ? `[${request.shapeId}]: ${randomResponse}` : randomResponse,
        voiceUrl: ENV.VOICE_ENABLED ? 'mock-voice-url' : undefined
      };
    }

    // Prepare messages for the API call
    const messages = [
      {
        role: 'system' as const,
        content: request.systemPrompt || 'You are a helpful assistant.'
      },
      {
        role: 'user' as const, 
        content: request.message
      }
    ];

    // Add optional shape ID to system prompt if provided
    if (request.shapeId) {
      messages[0].content = `You are the ${request.shapeId} shape. ${messages[0].content}`;
    }

    // Make API call
    const response = await shapesClient.chat.completions.create({
      model: request.shapeId || 'shapes-default', // Use shape ID as model if provided
      messages,
      temperature: 0.7,
      max_tokens: 150,
    });

    // Validate response
    const messageContent = response.choices[0]?.message?.content;
    if (!messageContent) {
      throw new Error('No response received from the shape');
    }

    // Generate voice URL if voice is enabled
    let voiceUrl: string | undefined = undefined;
    if (ENV.VOICE_ENABLED && ENV.VOICE_API_KEY) {
      // TODO: Implement actual voice API call
      voiceUrl = undefined; // Would be populated by the actual API
    }

    return {
      message: messageContent,
      voiceUrl
    };
  } catch (error) {
    console.error('Error chatting with shape:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to communicate with the shape');
  }
}

// Export the client for direct usage if needed
export { shapesClient }; 