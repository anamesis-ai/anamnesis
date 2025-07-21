import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger.js';
import { verifySanityWebhook } from '../utils/webhook-security.js';

export const webhookRouter = Router();

interface SanityWebhookPayload {
  _type: string;
  _id: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
  slug?: {
    current: string;
  };
  internalTitle?: string;
  relatedPost?: {
    _ref: string;
    _type: string;
  };
  campaignStatus?: string;
  scheduledPublicationDate?: string;
  platforms?: Array<{
    platform: string;
    caption: string;
    hashtags?: string[];
  }>;
}

const isSocialMediaDocument = (payload: SanityWebhookPayload): boolean => {
  return payload._type === 'socialMedia';
};

webhookRouter.post('/sanity', async (req: Request, res: Response) => {
  try {
    logger.info('Webhook received', {
      headers: {
        'content-type': req.get('Content-Type'),
        'user-agent': req.get('User-Agent'),
        'content-length': req.get('Content-Length')
      },
      bodySize: JSON.stringify(req.body).length
    });

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
    if (webhookSecret) {
      const isValid = await verifySanityWebhook(req, webhookSecret);
      if (!isValid) {
        logger.warn('Webhook verification failed', {
          ip: req.ip,
          userAgent: req.get('User-Agent')
        });
        return res.status(401).json({ error: 'Unauthorized' });
      }
      logger.debug('Webhook signature verified');
    } else {
      logger.warn('No webhook secret configured - skipping verification');
    }

    const payload = req.body as SanityWebhookPayload;

    // Log all incoming webhooks for debugging
    logger.info('Sanity webhook payload received', {
      documentType: payload._type,
      documentId: payload._id,
      documentRev: payload._rev,
      hasSlug: !!payload.slug?.current
    });

    // Filter for social media documents
    if (isSocialMediaDocument(payload)) {
      logger.info('Social Media document detected - processing', {
        documentId: payload._id,
        internalTitle: payload.internalTitle,
        campaignStatus: payload.campaignStatus,
        scheduledDate: payload.scheduledPublicationDate,
        platformCount: payload.platforms?.length || 0,
        relatedPost: payload.relatedPost?._ref
      });

      // Log structured JSON payload as requested
      const structuredPayload = {
        webhook: {
          type: 'sanity',
          timestamp: new Date().toISOString(),
          source: 'social_media_document'
        },
        document: {
          type: payload._type,
          id: payload._id,
          revision: payload._rev,
          createdAt: payload._createdAt,
          updatedAt: payload._updatedAt
        },
        socialMedia: {
          internalTitle: payload.internalTitle,
          campaignStatus: payload.campaignStatus,
          scheduledPublicationDate: payload.scheduledPublicationDate,
          relatedPost: payload.relatedPost,
          platforms: payload.platforms?.map(platform => ({
            platform: platform.platform,
            captionLength: platform.caption?.length || 0,
            hashtagCount: platform.hashtags?.length || 0,
            hashtags: platform.hashtags
          })) || []
        },
        metadata: {
          processingTimestamp: new Date().toISOString(),
          agentBridge: {
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development'
          }
        }
      };

      logger.info('SOCIAL_MEDIA_WEBHOOK_PAYLOAD', structuredPayload);
      
      // Here you would typically:
      // 1. Queue the social media post for publishing
      // 2. Send to social media management service
      // 3. Store in database for tracking
      // 4. Trigger notification workflows
      
      logger.info('Social media webhook processing completed', {
        documentId: payload._id,
        platformsToProcess: payload.platforms?.length || 0
      });
      
    } else {
      logger.debug('Non-social media document - ignoring', {
        documentType: payload._type,
        documentId: payload._id
      });
    }

    // Always return success to Sanity
    res.json({
      success: true,
      message: 'Webhook processed successfully',
      timestamp: new Date().toISOString(),
      processedDocument: {
        type: payload._type,
        id: payload._id,
        processed: isSocialMediaDocument(payload)
      }
    });

  } catch (error) {
    logger.error('Webhook processing failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      requestBody: req.body
    });

    res.status(500).json({
      error: 'Webhook processing failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});