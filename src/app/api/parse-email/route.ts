import { NextRequest, NextResponse } from 'next/server';
import { openRouterClient } from '@/lib/openrouter';
import { xanoClient } from '@/lib/xano';

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

    // Parse the email using AI
    const parseResult = await openRouterClient.parseRFQEmail({
      email_body,
      email_subject,
    });

    // Create RFQ in Xano
    const rfqResponse = await xanoClient.createRFQ({
      email_body,
      email_subject: email_subject || 'No subject',
      sender_email: sender_email || parseResult.parsed_data.client_email,
      sender_name: sender_name || parseResult.parsed_data.client_name,
      parsed_data: parseResult.parsed_data,
      status: 'parsed',
      ai_confidence: parseResult.confidence,
    });

    if (!rfqResponse.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to save RFQ' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        rfq: rfqResponse.data,
        parsing: {
          confidence: parseResult.confidence,
          reasoning: parseResult.ai_reasoning,
        },
      },
    });
  } catch (error) {
    console.error('Parse email error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
