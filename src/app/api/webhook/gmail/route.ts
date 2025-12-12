import { NextRequest, NextResponse } from 'next/server';
import { parseGmailWebhookPayload, verifyGmailWebhook } from '@/lib/gmail';
import { xanoClient } from '@/lib/xano';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify webhook secret
    const secret = request.headers.get('x-webhook-secret');
    const expectedSecret = process.env.GMAIL_WEBHOOK_SECRET;
    
    if (!verifyGmailWebhook(expectedSecret || '', secret || '')) {
      return NextResponse.json(
        { success: false, error: 'Invalid webhook secret' },
        { status: 401 }
      );
    }

    // Parse Gmail webhook payload
    const emailMessage = parseGmailWebhookPayload(body);
    
    if (!emailMessage) {
      return NextResponse.json(
        { success: false, error: 'Failed to parse email' },
        { status: 400 }
      );
    }

    // Create RFQ from email
    const rfqResponse = await xanoClient.createRFQ({
      email_body: emailMessage.body,
      email_subject: emailMessage.subject,
      sender_email: emailMessage.from,
      status: 'received',
    });

    if (!rfqResponse.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to create RFQ' },
        { status: 500 }
      );
    }

    // Trigger async parsing (could be done via a queue/webhook)
    // For now, just return success
    
    return NextResponse.json({
      success: true,
      data: {
        rfq_id: rfqResponse.data?.id,
        message: 'Email received and queued for processing',
      },
    });
  } catch (error) {
    console.error('Gmail webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle verification challenge from Gmail
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get('hub.challenge');
  
  if (challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  
  return NextResponse.json({ status: 'Gmail webhook endpoint active' });
}
