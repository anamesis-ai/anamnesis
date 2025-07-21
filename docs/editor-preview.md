# Editor Preview Workflow

This guide explains how to use the preview functionality in Sanity Studio to see draft content on the live website before publishing.

## Overview

The preview system allows content editors to:

- View draft content in the actual website layout
- See changes immediately without publishing
- Iterate on content with real-time feedback
- Collaborate on draft content with stakeholders

## 🚀 Quick Start

1. **Open a document** in Sanity Studio (blog post or directory item)
2. **Make your edits** and save as draft
3. **Click the "Preview" button** in the toolbar (eye icon)
4. **Review your content** in the website with the yellow preview banner
5. **Exit preview** when done or publish your changes

## 📝 Step-by-Step Workflow

### Step 1: Create or Edit Content

1. **Navigate to Content**
   - For blog posts: Go to "📝 Blog" → "Posts"
   - For directory items: Go to "📂 Directory" → "Directory Items"

2. **Create or Open Document**
   - Click "Create" for new content or select existing document
   - Make your changes to title, content, images, etc.

3. **Save as Draft**
   - Use `Ctrl/Cmd + S` to save
   - You don't need to publish yet - draft is sufficient for preview

### Step 2: Access Preview

1. **Locate Preview Button**
   - Look for the eye icon (👁️) in the document toolbar
   - Button may be labeled "Preview" or show just the eye icon

2. **Click Preview**
   - Studio generates a secure preview URL
   - Opens your content in a new browser tab/window
   - Automatically enables draft mode with authentication

### Step 3: Review in Preview Mode

1. **Preview Banner**
   - Yellow banner appears at the top: "Preview Mode Active"
   - Indicates you're viewing draft content, not live content
   - Includes "Exit Preview" button

2. **Review Your Content**
   - See exactly how your content will appear on the live site
   - Check formatting, images, links, and layout
   - Content appears with real website styling and navigation

3. **Banner Controls**
   - **Minimize**: Click eye icon to minimize banner
   - **Exit Preview**: Click "Exit Preview" to return to normal site
   - **Close**: Click X to hide banner (stays in preview mode)

### Step 4: Iterate and Refine

1. **Make Changes**
   - Return to Sanity Studio tab
   - Edit your content further
   - Save changes (`Ctrl/Cmd + S`)

2. **Refresh Preview**
   - Go back to preview tab
   - Refresh the page (`F5` or `Ctrl/Cmd + R`)
   - Or click "Preview" button again in Studio

3. **Repeat Process**
   - Continue editing and previewing until satisfied
   - Share preview URL with team members for feedback

### Step 5: Publish When Ready

1. **Final Review**
   - Ensure all content is correct in preview
   - Check for typos, formatting issues, broken links

2. **Publish Content**
   - Return to Sanity Studio
   - Click "Publish" button
   - Content becomes live on the website

3. **Exit Preview**
   - Click "Exit Preview" in banner, or
   - Close preview tab and visit normal website

## 🎯 Content Types

### Blog Posts

**Preview URL Format**: `/blog/[slug]`

**What to Check**:

- Title and subtitle formatting
- Author information display
- Publication date
- Body content and formatting
- Tags and categories
- Related posts (if applicable)

### Directory Items

**Preview URL Format**: `/directory/[slug]`

**What to Check**:

- Company/resource name and logo
- Category assignment and display
- Summary description
- Website URL link functionality
- Contact information
- Directory listing appearance

## 🔧 Advanced Features

### Manual Preview URLs

For advanced users or debugging:

```
Format: /api/draft?secret=YOUR_SECRET&slug=/blog/your-slug
Example: https://anamnesis-cms.vercel.app/api/draft?secret=anm_sec_2025...&slug=/blog/my-post
```

**Note**: Replace `YOUR_SECRET` with the actual revalidation secret from environment variables.

### Sharing Preview Links

1. **Generate Preview Link**
   - Click Preview button in Studio
   - Copy the URL from the browser address bar

2. **Share with Team**
   - Send URL to stakeholders for review
   - Recipients will see the yellow preview banner
   - No Studio access required for reviewers

3. **Security Note**
   - Preview links contain authentication tokens
   - Don't share publicly or post on social media
   - Links expire when content is published

## 🛠️ Troubleshooting

### Preview Button Not Working

**Possible Causes**:

- Missing or invalid revalidation secret
- Network connectivity issues
- Studio configuration problems

**Solutions**:

1. Check environment variables are set correctly
2. Ensure web app is running (local development)
3. Verify Studio and web app are on same network
4. Check browser console for error messages

### Preview Shows Old Content

**Possible Causes**:

- Browser cache
- Draft not saved properly
- Multiple tabs with different versions

**Solutions**:

1. Hard refresh the preview page (`Ctrl/Cmd + Shift + R`)
2. Save draft again in Studio
3. Close other preview tabs
4. Click Preview button again

### Preview Banner Not Appearing

**Possible Causes**:

- Not in draft mode
- Banner was minimized or closed
- JavaScript errors

**Solutions**:

1. Verify you're accessing via Preview button
2. Look for minimized eye icon in top-right
3. Check browser console for errors
4. Clear browser cache and cookies

### Can't Exit Preview Mode

**Solutions**:

1. Click "Exit Preview" in yellow banner
2. Navigate directly to `/api/disable-draft`
3. Clear browser cookies for the site
4. Close preview tab and open normal website

## 💡 Best Practices

### For Content Editors

1. **Always Preview Before Publishing**
   - Check content in actual website context
   - Verify all links and images work
   - Test on different screen sizes if possible

2. **Save Frequently**
   - Use `Ctrl/Cmd + S` regularly while editing
   - Studio auto-saves, but manual saves are recommended

3. **Use Descriptive Drafts**
   - Save meaningful progress as drafts
   - Preview major changes before committing

### For Content Review

1. **Share Preview Links**
   - Let stakeholders review content before publishing
   - Gather feedback using preview mode

2. **Check All Elements**
   - Text formatting and readability
   - Image placement and quality
   - Link functionality
   - Mobile responsiveness (if applicable)

3. **Document Feedback**
   - Use Studio comments for internal notes
   - Track changes in version history

### For Development

1. **Environment Setup**
   - Ensure both Studio and web app are running locally
   - Verify environment variables are configured
   - Test preview functionality after any changes

2. **Testing Process**
   - Test preview with both content types
   - Verify banner functionality
   - Check preview URL generation

## 📚 Related Documentation

- [CMS Usage Guide](../README_CMS.md) - Complete Studio documentation
- [Security Best Practices](../README_CMS.md#security-best-practices) - Secret management
- [Webhook Setup](../README_CMS.md#webhook-setup-for-automatic-revalidation) - Auto-revalidation

## 🆘 Need Help?

If you encounter issues not covered in this guide:

1. Check the [troubleshooting section](#🛠️-troubleshooting) above
2. Review environment variable configuration
3. Verify both Studio and web app are running
4. Check browser console for error messages

For technical support, contact the development team with:

- Description of the issue
- Steps to reproduce
- Browser and operating system information
- Any error messages from browser console
