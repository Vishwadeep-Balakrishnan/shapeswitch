import { NextResponse } from 'next/server';

// Safely access API key with warning instead of error to prevent build failures
const API_KEY = process.env.SHAPESINC_API_KEY;
if (!API_KEY && process.env.NODE_ENV === 'production') {
  console.warn('WARNING: SHAPESINC_API_KEY environment variable is not set in production');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, systemPrompt, shapeId } = body;
    
    // Validate required fields
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual AI service integration using process.env.SHAPESINC_API_KEY
    // For now, return mock response with shape-specific customization if provided
    const shapePrefix = shapeId ? `[${shapeId}]: ` : '';
    const mockResponse = {
      message: `${shapePrefix}Your personality screams 'I read one self-help book and now I think I'm a life coach.' But hey, at least your dedication to mediocrity is consistent! 🎯`,
      voiceUrl: undefined // Add voice URL when voice service is integrated
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
} 