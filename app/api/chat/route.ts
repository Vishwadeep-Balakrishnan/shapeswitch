import { NextResponse } from 'next/server';
import { z } from 'zod';

// Safely access API key with warning instead of error to prevent build failures
const API_KEY = process.env.SHAPESINC_API_KEY;
if (!API_KEY && process.env.NODE_ENV === 'production') {
  console.warn('WARNING: SHAPESINC_API_KEY environment variable is not set in production');
}

const BodySchema = z.object({
  message: z.string().min(1),
  systemPrompt: z.string().optional(),
  shapeId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = BodySchema.safeParse(await request.json());
    if (!body.success) {
      return NextResponse.json({ error: 'Invalid request body', details: body.error.flatten().fieldErrors }, { status: 400 });
    }
    const { message, systemPrompt, shapeId } = body.data;
    
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