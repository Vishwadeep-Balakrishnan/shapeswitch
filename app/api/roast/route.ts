import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const BodySchema = z.object({
  target: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const parsed = BodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const { target } = parsed.data;

    // Check API key
    const apiKey = process.env.SHAPESINC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is not configured' },
        { status: 500 }
      );
    }

    // For now, return a mock response
    // TODO: Implement actual API call to ShapesInc API
    return NextResponse.json({
      roast: `Your ${target} skills are like a maze - confusing, poorly designed, and full of dead ends. Even a quantum computer would get lost trying to understand your logic!`,
      mirrorScore: 8.5,
      voiceUrl: undefined // Will be implemented with actual API
    });
  } catch (error) {
    console.error('Error in roast API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 