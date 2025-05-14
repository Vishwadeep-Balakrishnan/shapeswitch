import OpenAI from 'openai';

// Validate environment variables
const SHAPES_API_KEY = process.env.SHAPES_API_KEY;
const SHAPES_API_BASE_URL = process.env.SHAPES_API_BASE_URL;

if (!SHAPES_API_KEY) {
  throw new Error(
    'Missing SHAPES_API_KEY environment variable. ' +
    'Please rename env.dev to .env.local and set your API key.'
  );
}

if (!SHAPES_API_BASE_URL) {
  throw new Error(
    'Missing SHAPES_API_BASE_URL environment variable. ' +
    'Please rename env.dev to .env.local and ensure the base URL is set.'
  );
}

// Initialize the OpenAI-compatible client with Shapes API configuration
const shapesClient = new OpenAI({
  apiKey: SHAPES_API_KEY,
  baseURL: SHAPES_API_BASE_URL,
});

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Send messages to a specific shape and get their response
 * @param shapeUsername The username/identifier of the shape to chat with
 * @param messages Array of messages in the conversation
 * @returns The first message from the shape's response
 */
export async function chatWithShape(shapeUsername: string, messages: Message[]) {
  try {
    // Validate inputs
    if (!shapeUsername) {
      throw new Error('Shape username is required');
    }
    
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error('At least one message is required');
    }

    // Add shape-specific system message
    const conversationWithShape = [
      {
        role: 'system',
        content: `You are now chatting with the ${shapeUsername} shape. Maintain this personality throughout the conversation.`
      },
      ...messages
    ];

    const response = await shapesClient.chat.completions.create({
      model: shapeUsername, // Use the shape username as the model identifier
      messages: conversationWithShape,
      temperature: 0.7,
      max_tokens: 150,
    });

    // Return the first message content from the response
    const messageContent = response.choices[0]?.message?.content;
    if (!messageContent) {
      throw new Error('No response received from the shape');
    }

    return messageContent;
  } catch (error) {
    console.error('Error chatting with shape:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to communicate with the shape');
  }
}

// Export the client for direct usage if needed
export { shapesClient }; 