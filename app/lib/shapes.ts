export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: string;
  voiceUrl?: string;
}

export interface ChatRequest {
  message: string;
  systemPrompt?: string;
  shapeId?: string;
}

export async function chatWithShape(request: ChatRequest): Promise<ChatResponse> {
  const apiKey = process.env.SHAPESINC_API_KEY;
  
  if (!apiKey) {
    throw new Error('SHAPESINC_API_KEY environment variable is not set');
  }

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to chat with shape');
  }

  return response.json();
} 