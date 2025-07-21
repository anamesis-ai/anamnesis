import { Request } from 'express';
import { createHmac, timingSafeEqual } from 'crypto';

export async function verifySanityWebhook(req: Request, secret: string): Promise<boolean> {
  try {
    const signature = req.get('sanity-webhook-signature');
    
    if (!signature) {
      return false;
    }

    // Get raw body as string
    const rawBody = JSON.stringify(req.body);
    
    // Create expected signature
    const expectedSignature = createHmac('sha256', secret)
      .update(rawBody, 'utf8')
      .digest('hex');
    
    // Compare signatures using timing-safe comparison
    const signatureBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    
    if (signatureBuffer.length !== expectedBuffer.length) {
      return false;
    }
    
    return timingSafeEqual(signatureBuffer, expectedBuffer);
    
  } catch (error) {
    console.error('Webhook verification error:', error);
    return false;
  }
}