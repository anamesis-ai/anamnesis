# Agent Bridge

A Node.js service that listens for Sanity webhooks and processes social media document changes for automated social media posting.

## Overview

The Agent Bridge acts as a webhook receiver and processor for the Anamnesis CMS. When social media campaigns are created or updated in Sanity Studio, this service receives webhook notifications and logs structured JSON payloads for further processing.

## Features

- 🔗 **Webhook Endpoint**: Receives Sanity webhooks at `/webhook/sanity`
- 🔍 **Document Filtering**: Only processes `socialMedia` document types
- 🔒 **Security**: HMAC signature verification for webhook authenticity
- 📊 **Structured Logging**: JSON-formatted logs with detailed payload information
- 🏥 **Health Monitoring**: Health check endpoint at `/health`
- 🚀 **Development Ready**: Hot reloading with tsx

## Quick Start

### 1. Install Dependencies

```bash
cd agent-bridge
pnpm install
```

### 2. Configure Environment

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Required environment variables:
- `PORT`: Server port (default: 3001)
- `SANITY_WEBHOOK_SECRET`: Secret for webhook verification
- `LOG_LEVEL`: Logging level (debug, info, warn, error)
- `NODE_ENV`: Environment (development, production)

### 3. Start Development Server

```bash
pnpm dev
```

Server starts on `http://localhost:3001`

### 4. Test the Webhook

```bash
pnpm test
```

This sends sample payloads to test social media document processing.

## API Endpoints

### POST /webhook/sanity

Receives Sanity webhook payloads and processes social media documents.

**Headers:**
- `Content-Type: application/json`
- `sanity-webhook-signature`: HMAC signature (if configured)

**Social Media Payload Example:**
```json
{
  "_type": "socialMedia",
  "_id": "social-media-123",
  "internalTitle": "Blog Post Promotion",
  "campaignStatus": "scheduled",
  "scheduledPublicationDate": "2025-01-21T14:00:00Z",
  "relatedPost": {
    "_ref": "post-abc-123",
    "_type": "reference"
  },
  "platforms": [
    {
      "platform": "twitter",
      "caption": "Check out our latest post! 🚀",
      "hashtags": ["webdev", "javascript"]
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Webhook processed successfully",
  "timestamp": "2025-01-20T12:00:00Z",
  "processedDocument": {
    "type": "socialMedia",
    "id": "social-media-123",
    "processed": true
  }
}
```

### GET /health

Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "service": "agent-bridge",
  "version": "1.0.0",
  "timestamp": "2025-01-20T12:00:00Z",
  "uptime": 3600,
  "environment": "development"
}
```

## Document Processing

The Agent Bridge specifically filters for `socialMedia` document types and logs structured payloads:

### Structured Logging Output

When a social media document is processed, the service logs:

```json
{
  "webhook": {
    "type": "sanity",
    "timestamp": "2025-01-20T12:00:00Z",
    "source": "social_media_document"
  },
  "document": {
    "type": "socialMedia",
    "id": "social-media-123",
    "revision": "rev-456"
  },
  "socialMedia": {
    "internalTitle": "Blog Post Promotion",
    "campaignStatus": "scheduled",
    "scheduledPublicationDate": "2025-01-21T14:00:00Z",
    "relatedPost": {
      "_ref": "post-abc-123",
      "_type": "reference"
    },
    "platforms": [
      {
        "platform": "twitter",
        "captionLength": 42,
        "hashtagCount": 2,
        "hashtags": ["webdev", "javascript"]
      }
    ]
  },
  "metadata": {
    "processingTimestamp": "2025-01-20T12:00:00Z",
    "agentBridge": {
      "version": "1.0.0",
      "environment": "development"
    }
  }
}
```

## Webhook Security

The service supports HMAC SHA-256 webhook signature verification:

1. **Set Webhook Secret**: Configure `SANITY_WEBHOOK_SECRET` in your environment
2. **Sanity Webhook Setup**: Use the same secret when configuring webhooks in Sanity
3. **Automatic Verification**: The service automatically verifies signatures when secret is configured

## Integration with Sanity

### Webhook Configuration

In Sanity Manage (https://manage.sanity.io/):

1. **Navigate to**: Project → API → Webhooks
2. **Create Webhook** with:
   - **URL**: `https://your-domain.com/webhook/sanity`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type == "socialMedia"`
   - **HTTP Method**: POST
   - **Secret**: Your `SANITY_WEBHOOK_SECRET` value

### CMS Schema Integration

The service processes social media documents created through the CMS with this schema structure:

```typescript
{
  _type: 'socialMedia',
  internalTitle: string,
  relatedPost: reference,
  campaignStatus: 'draft' | 'scheduled' | 'published' | 'cancelled',
  scheduledPublicationDate: datetime,
  platforms: [
    {
      platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'threads' | 'mastodon',
      caption: string,
      hashtags: string[]
    }
  ]
}
```

## Development

### Scripts

- `pnpm dev` - Start development server with hot reloading
- `pnpm build` - Build TypeScript to JavaScript
- `pnpm start` - Start production server
- `pnpm test` - Run webhook tests
- `pnpm clean` - Clean build directory

### Project Structure

```
agent-bridge/
├── src/
│   ├── index.ts              # Main Express server
│   ├── routes/
│   │   ├── health.ts         # Health check endpoint
│   │   └── webhook.ts        # Webhook processing logic
│   ├── utils/
│   │   ├── logger.ts         # Structured logging utility
│   │   └── webhook-security.ts # HMAC verification
│   └── test-webhook.js       # Testing script
├── .env.example              # Environment template
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

### Logging Configuration

Configure logging behavior with environment variables:

- `LOG_LEVEL`: `debug`, `info`, `warn`, `error` (default: `info`)
- `LOG_FORMAT`: `json`, `text` (default: `json`)

### Error Handling

The service includes comprehensive error handling:

- **Webhook Verification Failures**: Returns 401 Unauthorized
- **Processing Errors**: Returns 500 with error details
- **Invalid Payloads**: Logs errors but returns 200 to prevent webhook retries
- **Route Not Found**: Returns 404 with available endpoints

## Production Deployment

### Environment Setup

Ensure these environment variables are set:

```bash
NODE_ENV=production
PORT=3001
SANITY_WEBHOOK_SECRET=your-secure-secret
LOG_LEVEL=info
LOG_FORMAT=json
```

### Security Considerations

1. **Use HTTPS**: Always use HTTPS in production
2. **Configure Secrets**: Set strong webhook secrets
3. **Network Security**: Restrict access to webhook endpoints
4. **Rate Limiting**: Consider rate limiting for webhook endpoints
5. **Monitoring**: Set up log monitoring and alerting

### Scaling

The service is designed to be stateless and can be horizontally scaled:

- **Load Balancers**: Can distribute webhook traffic
- **Container Ready**: Works with Docker/Kubernetes
- **Database**: Add database integration for persistence
- **Queue System**: Add message queues for high-volume processing

## Next Steps

This service currently logs social media document payloads. To extend functionality:

1. **Social Media APIs**: Integrate with Twitter, LinkedIn, Facebook APIs
2. **Scheduling**: Add job queue for scheduled posting
3. **Database**: Store campaign data and analytics
4. **Authentication**: Add OAuth flows for social platforms
5. **Monitoring**: Add metrics and alerting
6. **Testing**: Add comprehensive test suite

## Troubleshooting

### Common Issues

**Server won't start:**
- Check port 3001 isn't in use
- Verify all dependencies are installed
- Check environment variables

**Webhook not receiving requests:**
- Verify Sanity webhook URL is correct
- Check webhook filter expression
- Ensure service is accessible from internet

**Signature verification failing:**
- Confirm webhook secret matches Sanity configuration
- Check request headers include `sanity-webhook-signature`
- Verify payload hasn't been modified

### Debug Mode

Enable debug logging:

```bash
LOG_LEVEL=debug pnpm dev
```

This logs all incoming requests and detailed processing information.