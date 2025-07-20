#!/bin/bash

# Test script for Sanity webhook endpoint
# Usage: ./test-webhook.sh [url] [secret]

URL=${1:-"http://localhost:3000/api/revalidate"}
SECRET=${2:-"your-revalidate-secret"}

echo "Testing webhook endpoint: $URL"
echo "Using secret: $SECRET"
echo

# Test post revalidation
echo "Testing post revalidation..."
curl -X POST "$URL?secret=$SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "post",
    "_id": "test-post-id",
    "slug": {
      "current": "test-post-slug"
    }
  }' \
  -w "\nStatus: %{http_code}\nTime: %{time_total}s\n\n"

# Test directory item revalidation
echo "Testing directory item revalidation..."
curl -X POST "$URL?secret=$SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "directoryItem",
    "_id": "test-directory-id",
    "slug": {
      "current": "test-directory-slug"
    }
  }' \
  -w "\nStatus: %{http_code}\nTime: %{time_total}s\n\n"

# Test invalid secret
echo "Testing invalid secret (should fail)..."
curl -X POST "$URL?secret=invalid-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "post",
    "_id": "test-post-id",
    "slug": {
      "current": "test-post-slug"
    }
  }' \
  -w "\nStatus: %{http_code}\nTime: %{time_total}s\n\n"

echo "Webhook testing complete!"