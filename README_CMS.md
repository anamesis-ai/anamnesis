# Directorium CMS Usage Guide

This guide explains how to use the Sanity CMS for the Directorium project, including creating content and using live preview features.

## Quick Start

### Starting the CMS

```bash
cd apps/cms
pnpm dev
```

The Studio will be available at `http://localhost:3333`

### Starting the Web App (for preview)

```bash
cd apps/web
pnpm dev
```

The web app will be available at `http://localhost:3000`

## Creating Content

### Adding a Blog Post

1. **Navigate to Blog Section**
   - Open Sanity Studio at `http://localhost:3333`
   - Click on "📝 Blog" in the left sidebar
   - Click on "Posts"

2. **Create New Post**
   - Click the "Create" button (+ icon)
   - Fill in the required fields:
     - **Title**: The post title
     - **Slug**: Auto-generated from title (can be customized)
     - **Body**: Rich text content using the block editor
     - **Author**: Reference to an author (create authors first if needed)
     - **Tags**: Array of string tags
     - **Publish Date**: When the post should be published

3. **Save the Post**
   - Click "Publish" to make it live
   - Or save as draft to work on it later

### Adding Authors

1. **Navigate to Authors**
   - Go to "📝 Blog" → "Authors"
   - Click "Create"

2. **Fill Author Details**
   - **Name**: Author's full name
   - **Slug**: URL-friendly identifier
   - **Image**: Optional profile picture
   - **Bio**: Short biography

### Adding Directory Items

1. **Navigate to Directory Section**
   - Click on "📂 Directory" in the left sidebar
   - Click on "Directory Items"

2. **Choose Template**
   - Click "Create" to see template options
   - Select a category template:
     - 💻 Technology
     - 💼 Business
     - 📚 Education
     - 🏥 Health
     - 🎬 Entertainment
     - 📰 News
     - 💰 Finance
     - ✈️ Travel
     - 📁 Other

3. **Fill Directory Item Details**
   - **Title**: Name of the resource/company
   - **Slug**: URL-friendly identifier
   - **Summary**: Brief description (max 300 characters)
   - **Category**: Pre-filled based on template selection
   - **Website URL**: Link to the resource
   - **Logo**: Optional image upload

## Live Preview Features

### Triggering Preview Mode

1. **From Sanity Studio**
   - When editing a document, look for the preview/eye icon
   - Click to open the preview in the web app
   - This automatically enables draft mode

2. **Manual Draft Mode**
   - Navigate to: `http://localhost:3000/api/draft?secret=your-revalidate-secret&slug=/posts/your-post-slug`
   - Replace `your-post-slug` with the actual slug

### Using Live Preview

1. **Draft Mode Indicator**
   - When in draft mode, you'll see a yellow banner at the top
   - Banner shows "Draft Mode Active" with an exit link

2. **Real-time Updates**
   - Edit content in Sanity Studio
   - Changes appear immediately in the web app preview
   - No need to refresh the page

3. **Exiting Draft Mode**
   - Click "Exit draft mode" in the yellow banner
   - Or navigate to: `http://localhost:3000/api/disable-draft`

## Content Structure

### Schema Types

- **Post**: Blog articles with rich text content
- **Author**: Author profiles for blog posts
- **Directory Item**: Resource listings with categories
- **Block Content**: Rich text content type for posts

### URLs

- **Posts**: `http://localhost:3000/posts/[slug]`
- **Directory Items**: `http://localhost:3000/directory/[slug]`
- **Posts List**: `http://localhost:3000/posts`
- **Directory List**: `http://localhost:3000/directory`

## Troubleshooting

### Preview Not Working

1. **Check Environment Variables**
   - Ensure `.env.local` exists in `apps/web/`
   - Verify `SANITY_REVALIDATE_SECRET` is set

2. **Check Both Apps Are Running**
   - CMS should be on port 3333
   - Web app should be on port 3000

3. **Draft Mode Issues**
   - Try manually accessing `/api/disable-draft` to reset
   - Check that the secret matches between CMS and web app

### Content Not Appearing

1. **Check Publication Status**
   - Ensure content is published, not just saved as draft
   - For preview, draft content should show in draft mode

2. **Check Slug Generation**
   - Verify slugs are generated correctly
   - Slugs should be URL-friendly (no spaces, special characters)

## Webhook Setup for Automatic Revalidation

### Overview

When you publish content in Sanity Studio, a webhook can automatically trigger the live site to update within 60 seconds. This ensures your published content appears immediately without manual intervention.

### Setting Up the Webhook

1. **Access Webhook Settings**
   - Go to [Sanity Manage](https://manage.sanity.io/)
   - Select your project
   - Navigate to "API" → "Webhooks"

2. **Create New Webhook**
   - Click "Create webhook"
   - **Name**: `Vercel Revalidation`
   - **URL**: `https://anamnesis-cms.vercel.app/api/revalidate?secret=anm_2025_revalidate_7mK9pL3xQ8vN2wR5tE6yU1zA4bC`
   - **Dataset**: `production`
   - **Trigger on**: `Create`, `Update`, `Delete`
   - **Filter**: `_type == "post" || _type == "directoryItem"`
   - **HTTP method**: `POST`
   - **HTTP headers**: None required
   - **Include drafts**: No

3. **Environment Variables Configured**
   Your environment variables are already set up with:
   - **Project ID**: `72edep87`
   - **API Token**: Configured
   - **Revalidation Secret**: `anm_2025_revalidate_7mK9pL3xQ8vN2wR5tE6yU1zA4bC`

4. **Test the Webhook**
   - Save the webhook configuration
   - Publish a post or directory item in Studio
   - Check webhook logs in Sanity Manage
   - Verify content appears on live site within 60 seconds

### Webhook Payload

The webhook sends this payload to your endpoint:

```json
{
  "_type": "post",
  "_id": "document-id",
  "slug": {
    "current": "document-slug"
  }
}
```

### Troubleshooting Webhooks

1. **Webhook Not Triggering**
   - Check webhook URL is correct
   - Verify secret matches environment variable
   - Ensure filter expression is correct

2. **Revalidation Not Working**
   - Check Vercel function logs
   - Verify environment variables are set in Vercel
   - Test webhook URL manually with curl

3. **Webhook Failing**
   - Check webhook logs in Sanity Manage
   - Verify endpoint returns 200 status
   - Check for network connectivity issues

## Tips

- **Save Frequently**: Use Ctrl/Cmd + S to save drafts
- **Use Templates**: Always use directory item templates for consistent categorization
- **Preview Before Publishing**: Use draft mode to review content before making it live
- **Rich Text**: Use the block editor toolbar for formatting posts
- **Images**: Upload images directly in the Studio for logos and author photos
- **Webhook Testing**: Use the webhook test feature in Sanity Manage to verify setup
