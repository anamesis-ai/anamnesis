# Social Media Integration APIs Guide

This document provides comprehensive technical details for integrating with X (Twitter), Instagram, and TikTok APIs for automated content posting. All information is current as of January 2025.

## Table of Contents

- [X (Twitter) API Integration](#x-twitter-api-integration)
- [Instagram API Integration](#instagram-api-integration)
- [TikTok API Integration](#tiktok-api-integration)
- [Implementation Recommendations](#implementation-recommendations)
- [Security Considerations](#security-considerations)

---

## X (Twitter) API Integration

### API Endpoints

**Primary Posting Endpoint:**

- `POST https://api.x.com/2/tweets` - Creates tweets on behalf of authenticated users

**Media Upload Endpoint (2025 Update):**

- `POST https://api.x.com/2/media/upload` - **New v2 media endpoint**
- ⚠️ **Critical:** v1.1 media upload endpoint deprecated March 31, 2025

### Required OAuth Scopes

```
users.read tweet.read tweet.write media.write offline.access
```

**Essential Scopes:**

- `tweet.write` - Required for creating/posting tweets
- `users.read` - Required to read user profile information
- `media.write` - Required for uploading media content
- `offline.access` - Enables access when user isn't signed in (for scheduled posts)

### Authentication Requirements

**Supported Methods:**

- OAuth 2.0 Authorization Code with PKCE (recommended)
- OAuth 1.0a User Context (legacy support)

**Setup Requirements:**

- Approved developer account
- App linked to Project in developer portal
- Callback URI and Website URL configured
- App type: "Web App", "Automated App", or "Bot"

### Rate Limits (2025)

**Monthly Post Limits by Tier:**

- **Free:** 500 posts/month
- **Basic:** 10,000 posts/month ($100/month)
- **Pro:** 1,000,000 posts/month
- **Enterprise:** 50,000,000+ posts/month

**Real-time Rate Limits:**

- Free: 50 requests per 24 hours per user
- Basic: 100 requests per 24 hours per user
- Pro: 100 tweets per 15-minute window per user
- Combined tweet/retweet limit: 300 per 3 hours

**Rate Limit Headers:**

```http
x-rate-limit-limit: 300
x-rate-limit-remaining: 299
x-rate-limit-reset: 1640995200
```

### Media Upload Specifications

**Supported Media Types:**

- Images: JPEG, PNG, GIF, WebP
- Videos: MP4, MOV
- Animated GIFs

**Upload Process:**

1. Upload media to `/2/media/upload` endpoint
2. Attach media ID to tweet creation request
3. Publish tweet with attached media

### Thread Posting

**Implementation Requirements:**

- No native thread support in single API call
- Create initial tweet, then reply to each subsequent tweet
- Track tweet IDs for proper threading sequence
- Character limit: 280 characters per tweet

**Example Thread Flow:**

```javascript
// 1. Create initial tweet
const tweet1 = await postTweet({ text: 'Thread 1/3...' });

// 2. Reply to create thread
const tweet2 = await postTweet({
  text: 'Thread 2/3...',
  reply: { in_reply_to_tweet_id: tweet1.id },
});

// 3. Continue thread
const tweet3 = await postTweet({
  text: 'Thread 3/3...',
  reply: { in_reply_to_tweet_id: tweet2.id },
});
```

### Request Format

```http
POST https://api.x.com/2/tweets
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "text": "Hello, world!",
  "media": {
    "media_ids": ["1234567890123456789"]
  }
}
```

---

## Instagram API Integration

### API Endpoints

**Content Publishing Flow:**

1. `POST /{ig-user-id}/media` - Create media container
2. `POST /{ig-user-id}/media_publish` - Publish media container

**Base URL:** `https://graph.facebook.com/v19.0/`

### Required OAuth Scopes

```
instagram_business_content_publish,instagram_content_publish,instagram_business_basic,pages_show_list
```

**Essential Permissions:**

- `instagram_business_content_publish` - Post to business accounts
- `instagram_content_publish` - General content publishing
- `instagram_business_basic` - Basic business account access
- `pages_show_list` - Facebook page access (required)

### Authentication Requirements

**OAuth Process:**

- Uses Facebook/Meta OAuth 2.0 system
- Requires Facebook Developer App with Instagram integration
- Two access levels: Standard Access and Advanced Access
- Long-lived tokens: 60-day validity (refreshable)

**App Setup Requirements:**

1. Facebook Developer account
2. Add Instagram product to Facebook app
3. Configure redirect URIs and domains
4. Complete App Review process for production
5. Instagram Business account linked to Facebook Page

### Rate Limits

**API Rate Limits:**

- **200 API calls per user per hour** (Graph API standard)
- **100 posts per 24-hour period** (updated 2025)
- **Business Use Case (BUC) limits:** 4,800 × impressions per 24 hours

**Rate Reset:**

- Limits reset every 24 hours
- Impression-based calculation affects available calls

### Content Types Supported

**Fully Supported (2025):**

- Single photos (JPEG only)
- Single videos
- Reels (full support added)
- Carousel posts (up to 10 items)
- Stories (Business accounts only)

**2025 Updates:**

- Alt text support added (`alt_text` field - March 24, 2025)

**Not Supported:**

- Shopping tags via API
- Branded content tags
- Filters or effects
- Live videos

### Media Requirements

**Image Specifications:**

- Format: JPEG only
- Minimum width: 600px (recommended 640px+)
- Aspect ratio: 1:1 recommended for optimal display
- Must be hosted on publicly accessible server

**Video Specifications:**

- Standard video formats supported
- Resumable uploads for large files
- Must be publicly accessible via URL

### Upload Process

```javascript
// 1. Create media container
const containerResponse = await fetch(
  `https://graph.facebook.com/v19.0/${igUserId}/media`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_url: 'https://example.com/image.jpg',
      caption: 'My amazing post! #instagram',
      alt_text: 'Description for accessibility',
    }),
  }
);

// 2. Publish media
const publishResponse = await fetch(
  `https://graph.facebook.com/v19.0/${igUserId}/media_publish`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      creation_id: containerResponse.id,
    }),
  }
);
```

### Account Requirements

**Business/Professional Accounts Required:**

- Instagram Business accounts: Full API access
- Instagram Creator accounts: Limited (no content publishing)
- Must be connected to Facebook Page
- Professional verification required

**Personal Accounts:**

- No API access for content publishing
- Instagram Basic Display API discontinued December 4, 2024

### App Review Process

**Requirements:**

- Extensive app review for production use
- Demonstrate legitimate business use case
- Provide detailed use case descriptions
- Submit screencast demonstrations
- 2-4 week approval timeline

---

## TikTok API Integration

### API Endpoints

**Content Posting Endpoints:**

- `POST https://open.tiktokapis.com/v2/post/publish/video/init/` - Direct video posting
- `POST https://open.tiktokapis.com/v2/post/publish/inbox/video/init/` - Draft upload
- `POST https://open.tiktokapis.com/v2/post/publish/content/init/` - Photo content
- `GET https://open.tiktokapis.com/v2/post/publish/status/fetch/` - Status check
- `GET https://open.tiktokapis.com/v2/post/publish/creator_info/query/` - Creator info

### Required OAuth Scopes

```
video.publish video.upload user.info.basic
```

**Essential Scopes:**

- `video.publish` - Direct posting to TikTok profiles
- `video.upload` - Uploading draft content
- `user.info.basic` - Basic user information (auto-included)

**Additional Scopes (Require Approval):**

- `user.info.profile` - Enhanced profile information
- `user.info.stats` - User statistics
- `video.list` - Read user's public videos

### Authentication Requirements

**OAuth Details:**

- Access Token Lifespan: 24 hours (86400 seconds)
- Refresh Token Lifespan: 1 year (31536000 seconds)
- Authorization Format: `Bearer act.example12345...`

**App Registration Requirements:**

- Registered TikTok Developer App
- Content Posting API product enabled
- Domain verification for URL-based uploads
- TikTok audit required for public content visibility

### Rate Limits

**Content Posting API:**

- **6 requests per minute per user access token**
- **600 requests per minute** for standard endpoints
- **One-minute sliding window** rate limiting
- **HTTP 429** response when limits exceeded

**Higher Limits:**

- Available upon request through TikTok Support
- Requires justification and review process

### Upload Methods

**Two Upload Options:**

1. **FILE_UPLOAD:** Direct file upload with chunked support
2. **PULL_FROM_URL:** Provide video URL from verified domain

### Video Specifications (2025)

**Supported Formats:**

- MP4, MOV, MPEG, 3GP, AVI, QuickTime, WebM
- **Recommended:** MP4 with H.264 compression
- **Audio:** AAC codec (minimum 192 kbps)

**Resolution Requirements:**

- **Optimal:** 1080 × 1920 pixels (9:16 aspect ratio)
- **Minimum:** 1080p resolution recommended
- **Frame Rate:** Maximum 30 fps (up to 60 fps supported)

**File Size Limits:**

- **Android:** 72 MB maximum
- **iOS:** 287.6 MB maximum
- **API uploads:** Up to 500 MB
- **Recommended:** Under 50 MB to avoid compression

**Duration Limits:**

- **Minimum:** 3 seconds
- **Maximum:** 60 minutes
- **Optimal engagement:** 15-34 seconds

**Bitrate Recommendations:**

- **1080p at 30fps:** 6-8 Mbps
- **1080p at 60fps:** 9-12 Mbps
- **General:** 5-10 Mbps using Variable Bitrate (VBR)

### Content Types Supported

**Video Content:**

- Direct posting to profile
- Draft upload for later editing
- Full scheduling capabilities

**Photo Content (2025):**

- Photo carousels (up to 35 photos on mobile)
- Requires `/content/init/` endpoint
- Must specify `post_mode` and `media_type` parameters

### Upload Process

```javascript
// 1. Query creator info
const creatorInfo = await fetch(
  'https://open.tiktokapis.com/v2/post/publish/creator_info/query/',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  }
);

// 2. Initialize video upload
const uploadInit = await fetch(
  'https://open.tiktokapis.com/v2/post/publish/video/init/',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post_info: {
        title: 'My amazing video!',
        privacy_level: 'PUBLIC_TO_EVERYONE',
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
        video_cover_timestamp_ms: 1000,
      },
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: 1048576,
        chunk_size: 10485760,
        total_chunk_count: 1,
      },
    }),
  }
);

// 3. Upload video chunks
// 4. Monitor status until complete
```

### Content Moderation (2025 Updates)

**Enhanced Requirements:**

- **AI content detection:** Advanced systems for deepfakes
- **Mandatory labeling:** AI-generated content disclosure required
- **Stricter verification:** Enhanced creator verification
- **Content authenticity:** Emphasis on transparency

**Privacy Levels:**

- `PUBLIC_TO_EVERYONE`
- `MUTUAL_FOLLOW_FRIENDS`
- `FOLLOWER_OF_CREATOR`
- `SELF_ONLY`

**Content Settings:**

- Disable/enable duet, stitch, comments
- Custom video cover timestamp
- Brand content toggle
- AI-generated content flag (mandatory for synthetic media)

### Regional Restrictions

**Geographic Limitations:**

- Research API limited to US and Europe academic researchers
- Regional data compliance requirements
- API availability varies by region and type

### Approval Process (2025)

**Timeline:**

- **Standard approval:** 3-4 days
- **Commercial Content API:** 1-2 weeks
- **Enhanced verification:** Required for business accounts

**Requirements:**

- Detailed justification for API integration
- Content audit mandatory for public visibility
- Stricter review process with enhanced verification

---

## Implementation Recommendations

### Development Best Practices

1. **Authentication Management**
   - Implement secure token storage and refresh mechanisms
   - Use environment variables for API keys and secrets
   - Implement proper OAuth flows with PKCE where supported

2. **Rate Limiting**
   - Implement client-side rate limiting to prevent API quota exhaustion
   - Use exponential backoff for retry logic
   - Monitor rate limit headers and adjust request frequency

3. **Error Handling**
   - Implement comprehensive error handling for all API responses
   - Log errors for debugging and monitoring
   - Provide user-friendly error messages

4. **Content Validation**
   - Validate content against platform policies before posting
   - Implement character limits and media format validation
   - Check content for required elements (alt text, captions, etc.)

5. **Monitoring and Analytics**
   - Implement logging for successful posts and failures
   - Track API usage and costs
   - Monitor post performance and engagement metrics

### Multi-Platform Strategy

1. **Content Adaptation**
   - Adapt content formats for each platform's specifications
   - Optimize aspect ratios and dimensions per platform
   - Tailor captions and hashtags for platform culture

2. **Scheduling Coordination**
   - Implement intelligent scheduling to avoid simultaneous posting
   - Consider optimal posting times for each platform
   - Handle timezone differences for global audiences

3. **Cross-Platform Analytics**
   - Aggregate performance metrics across platforms
   - Compare engagement rates and reach
   - Optimize posting strategies based on performance data

---

## Security Considerations

### Token Security

1. **Storage**
   - Store access tokens in secure, encrypted storage
   - Never expose tokens in client-side code or logs
   - Implement proper access controls for token storage

2. **Transmission**
   - Always use HTTPS for API communications
   - Implement certificate pinning where possible
   - Validate SSL certificates in API clients

3. **Rotation**
   - Implement automatic token refresh mechanisms
   - Monitor token expiration and renew proactively
   - Have fallback procedures for token refresh failures

### Content Security

1. **Content Validation**
   - Sanitize user-generated content before posting
   - Validate media files for malicious content
   - Implement content filtering for policy compliance

2. **User Authorization**
   - Verify user permissions before posting on their behalf
   - Implement proper consent mechanisms
   - Provide clear opt-out procedures

3. **Audit Logging**
   - Log all posting activities with timestamps
   - Track user consent and authorization events
   - Maintain audit trails for compliance purposes

### Compliance Considerations

1. **Data Privacy**
   - Comply with GDPR, CCPA, and regional privacy laws
   - Implement data minimization principles
   - Provide clear privacy policies and consent mechanisms

2. **Platform Policies**
   - Stay updated with platform policy changes
   - Implement automated policy compliance checking
   - Have procedures for handling policy violations

3. **Terms of Service**
   - Regularly review and comply with platform terms
   - Implement proper attribution and disclosure requirements
   - Respect platform rate limits and usage guidelines

---

_Last updated: January 2025_

_This document should be reviewed and updated regularly as social media platforms frequently update their APIs, policies, and requirements._
