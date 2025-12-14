import { NextRequest, NextResponse } from 'next/server';
import { openRouterClient } from '@/lib/openrouter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email_body, email_subject, sender_email, sender_name } = body;

    if (!email_body) {
      return NextResponse.json(
        { success: false, error: 'Email body is required' },
        { status: 400 }
      );
    }

    // Parse the email using OpenRouter AI only
    const parseResult = await openRouterClient.parseRFQEmail({
      email_body,
      email_subject: email_subject || 'No subject',
    });

    // Return just the parsed data without saving to Xano
    return NextResponse.json({
      success: true,
      parsed_data: parseResult.parsed_data,
      confidence: parseResult.confidence,
      ai_reasoning: parseResult.ai_reasoning,
    });
  } catch (error) {
    console.error('Parse email error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
