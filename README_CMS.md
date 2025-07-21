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

### 🎯 Preview Button in Studio

**NEW**: Draft Mode preview is now fully configured!

1. **Using the Preview Button**
   - Open any blog post or directory item in Sanity Studio
   - Look for the **"Preview"** button in the document toolbar (eye icon)
   - Click the preview button to open the draft content in your web frontend
   - Studio automatically enables draft mode and shows unpublished changes

2. **What Happens When You Click Preview**
   - Studio generates a secure preview URL with authentication
   - Opens the web app in a new tab/window
   - Sets the `__prerender_bypass` cookie for draft mode
   - Shows a **yellow preview banner** at the top of the page
   - Displays draft content immediately (even unpublished changes)

### 🔄 Real-time Preview Workflow

1. **Edit in Studio**
   - Make changes to your blog post or directory item
   - Save as draft (don't need to publish)

2. **Preview Changes**
   - Click the **Preview** button in Studio
   - See your draft changes instantly in the web frontend
   - Preview banner shows "Preview Mode Active"

3. **Iterate & Refine**
   - Go back to Studio, make more changes
   - Refresh the preview page to see updates
   - Or click Preview button again for a fresh preview

4. **Publish When Ready**
   - Once satisfied with your changes, click **Publish** in Studio
   - Content goes live on the actual website
   - Preview mode can be exited

### 🛠️ Draft Mode Controls

1. **Preview Banner**
   - **Yellow banner** appears at top when in draft mode
   - Shows "Preview Mode Active" with helpful context
   - Includes **"Exit Preview"** button
   - Can be minimized with the eye icon

2. **Exiting Draft Mode**
   - Click **"Exit Preview"** in the yellow banner
   - Or navigate to: `/api/disable-draft`
   - Or close the preview tab and open the normal site

3. **Manual Draft Mode** (Advanced)
   - Direct URL: `/api/draft?secret=YOUR_SECRET&slug=/blog/your-slug`
   - Useful for testing or sharing previews
   - Replace `YOUR_SECRET` with your environment variable value

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
   - **URL**: `https://anamnesis-cms.vercel.app/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
   - **Dataset**: `production`
   - **Trigger on**: `Create`, `Update`, `Delete`
   - **Filter**: `_type == "post" || _type == "directoryItem"`
   - **HTTP method**: `POST`
   - **HTTP headers**: None required
   - **Include drafts**: No

   ⚠️ **IMPORTANT**: Replace `YOUR_REVALIDATE_SECRET` with the value from your `SANITY_REVALIDATE_SECRET` environment variable

3. **Environment Variables Required**
   Set these in your `apps/web/.env.local` file:
   - **Project ID**: `72edep87`
   - **API Token**: (See your Sanity dashboard)
   - **Revalidation Secret**: (Generate a secure random string)

   🔒 **SECURITY**: Never commit secrets to git! Keep them only in environment files.

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

## Security Best Practices

### 🔒 **Secret Management**

**CRITICAL**: Never commit secrets to git repositories!

- ✅ **Store secrets in**: `.env.local` files (gitignored)
- ✅ **Store secrets in**: Vercel environment variables
- ❌ **NEVER store secrets in**: Committed code files
- ❌ **NEVER store secrets in**: README files
- ❌ **NEVER store secrets in**: Config files committed to git

### **Environment Variables Required**

```bash
# apps/web/.env.local (this file is gitignored - safe for secrets)
NEXT_PUBLIC_SANITY_PROJECT_ID=72edep87
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-api-token-here
NEXT_PUBLIC_SANITY_API_READ_TOKEN=your-api-token-here
SANITY_REVALIDATE_SECRET=your-secure-random-string-here
NEXT_PUBLIC_SITE_URL=https://anamnesis-cms.vercel.app
```

### **Secret Rotation**

If a secret is accidentally exposed:

1. **Immediately generate a new secret**
2. **Update .env.local with the new secret**
3. **Update Vercel environment variables**
4. **Update webhook in Sanity Manage**
5. **Remove exposed secrets from committed files**

### **Vercel Deployment**

Add environment variables in Vercel dashboard:

- Go to Project Settings → Environment Variables
- Add all secrets from `.env.local`
- Never expose secrets in build logs

## Tips

- **Save Frequently**: Use Ctrl/Cmd + S to save drafts
- **Use Templates**: Always use directory item templates for consistent categorization
- **Preview Before Publishing**: Use draft mode to review content before making it live
- **Rich Text**: Use the block editor toolbar for formatting posts
- **Images**: Upload images directly in the Studio for logos and author photos
- **Webhook Testing**: Use the webhook test feature in Sanity Manage to verify setup
- **Security**: Always use environment variables for secrets, never commit them
