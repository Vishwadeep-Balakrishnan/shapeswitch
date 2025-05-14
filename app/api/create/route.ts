import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const BodySchema = z.object({
  text: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const parsed = BodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const { text } = parsed.data;

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
      id: `shape_${Date.now()}`,
      name: 'Generated Shape',
      personaType: 'custom',
      status: 'active'
    });
  } catch (error) {
    console.error('Error in create shape API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 