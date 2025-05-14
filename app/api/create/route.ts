import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

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