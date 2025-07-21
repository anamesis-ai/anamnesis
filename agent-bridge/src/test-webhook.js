// Test script for the agent-bridge webhook endpoint
import fetch from 'node-fetch';

const WEBHOOK_URL = 'http://localhost:3001/webhook/sanity';

const sampleSocialMediaPayload = {
  _type: 'socialMedia',
  _id: 'social-media-test-123',
  _rev: 'revision-456',
  _createdAt: '2025-01-20T10:00:00Z',
  _updatedAt: '2025-01-20T10:30:00Z',
  internalTitle: 'Blog Post Promotion Campaign',
  relatedPost: {
    _ref: 'post-abc-123',
    _type: 'reference'
  },
  campaignStatus: 'scheduled',
  scheduledPublicationDate: '2025-01-21T14:00:00Z',
  platforms: [
    {
      platform: 'twitter',
      caption: 'Check out our latest blog post about web development! 🚀',
      hashtags: ['webdev', 'javascript', 'react', 'nextjs']
    },
    {
      platform: 'linkedin',
      caption: 'We just published a comprehensive guide to modern web development practices. This article covers the latest trends and best practices that every developer should know.',
      hashtags: ['webdevelopment', 'programming', 'technology', 'career']
    }
  ]
};

const sampleBlogPostPayload = {
  _type: 'post',
  _id: 'post-test-456',
  _rev: 'revision-789',
  title: 'Sample Blog Post',
  slug: {
    current: 'sample-blog-post'
  }
};

async function testWebhook(payload, description) {
  console.log(`\n🧪 Testing: ${description}`);
  console.log('📤 Sending payload to:', WEBHOOK_URL);
  
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'agent-bridge-test/1.0'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    console.log('📊 Response Status:', response.status);
    console.log('📋 Response Body:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Test passed');
    } else {
      console.log('❌ Test failed');
    }
    
  } catch (error) {
    console.error('🚨 Test error:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting agent-bridge webhook tests...');
  console.log('📝 Make sure the agent-bridge server is running on port 3001');
  
  // Test 1: Social Media Document (should be processed)
  await testWebhook(sampleSocialMediaPayload, 'Social Media Document (should process)');
  
  // Test 2: Regular Blog Post (should be ignored)
  await testWebhook(sampleBlogPostPayload, 'Blog Post Document (should ignore)');
  
  console.log('\n🏁 Tests completed!');
  console.log('📊 Check the agent-bridge server logs to see the structured JSON payload output');
}

runTests();