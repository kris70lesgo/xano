import { EmailMessage, GmailWebhookPayload } from '@/types';

export function verifyGmailWebhook(secret: string, receivedSecret?: string): boolean {
  return secret === receivedSecret;
}

export function parseGmailWebhookPayload(payload: GmailWebhookPayload): EmailMessage | null {
  try {
    // Decode the base64 message data
    const messageData = Buffer.from(payload.message.data, 'base64').toString('utf-8');
    const message = JSON.parse(messageData);

    return {
      id: message.id || payload.message.messageId,
      threadId: message.threadId || '',
      from: message.from || '',
      to: message.to || '',
      subject: message.subject || 'No Subject',
      body: message.body || message.snippet || '',
      date: payload.message.publishTime,
      attachments: message.attachments || [],
    };
  } catch (error) {
    console.error('Error parsing Gmail webhook payload:', error);
    return null;
  }
}

export async function fetchGmailMessage(messageId: string, accessToken: string): Promise<EmailMessage | null> {
  try {
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Gmail API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract headers
    const headers = data.payload?.headers || [];
    const getHeader = (name: string) => 
      headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

    // Extract body
    let body = '';
    if (data.payload?.parts) {
      const textPart = data.payload.parts.find((part: any) => 
        part.mimeType === 'text/plain' || part.mimeType === 'text/html'
      );
      if (textPart?.body?.data) {
        body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
      }
    } else if (data.payload?.body?.data) {
      body = Buffer.from(data.payload.body.data, 'base64').toString('utf-8');
    }

    return {
      id: data.id,
      threadId: data.threadId,
      from: getHeader('from'),
      to: getHeader('to'),
      subject: getHeader('subject'),
      body: body || data.snippet,
      date: new Date(parseInt(data.internalDate)).toISOString(),
      attachments: [],
    };
  } catch (error) {
    console.error('Error fetching Gmail message:', error);
    return null;
  }
}
