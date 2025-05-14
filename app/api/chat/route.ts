import { NextResponse } from 'next/server';

if (!process.env.SHAPESINC_API_KEY) {
  throw new Error('SHAPESINC_API_KEY environment variable is not set');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, systemPrompt } = body;

    // TODO: Replace with actual AI service integration using process.env.SHAPESINC_API_KEY
    // For now, return mock response
    const mockResponse = {
      message: "Your personality screams 'I read one self-help book and now I think I'm a life coach.' But hey, at least your dedication to mediocrity is consistent! 🎯",
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