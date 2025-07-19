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

## Tips

- **Save Frequently**: Use Ctrl/Cmd + S to save drafts
- **Use Templates**: Always use directory item templates for consistent categorization
- **Preview Before Publishing**: Use draft mode to review content before making it live
- **Rich Text**: Use the block editor toolbar for formatting posts
- **Images**: Upload images directly in the Studio for logos and author photos
