import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { structure } from './structure';
import { templates } from './templates';

export default defineConfig({
  name: 'default',
  title: 'Directorium CMS',

  projectId: 'your-project-id', // You'll need to replace this with actual project ID
  dataset: 'production',

  // Webhook configuration for revalidation:
  // To set up webhooks for automatic revalidation:
  // 1. Go to https://manage.sanity.io/projects/[your-project-id]/api/webhooks
  // 2. Create a new webhook with:
  //    - Name: "Vercel Revalidation"
  //    - URL: https://your-domain.vercel.app/api/revalidate?secret=your-revalidate-secret
  //    - Trigger on: Create, Update, Delete
  //    - Filter: _type == "post" || _type == "directoryItem"
  //    - HTTP method: POST
  // 3. Save and test the webhook

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates,
  },

  // Enable live preview
  document: {
    productionUrl: async (prev, { document }) => {
      const slug = (document as any)?.slug?.current;
      if (!slug || !document._type) {
        return prev;
      }

      const baseUrl = 'http://localhost:3000';

      if (document._type === 'post') {
        return `${baseUrl}/posts/${slug}`;
      }

      if (document._type === 'directoryItem') {
        return `${baseUrl}/directory/${slug}`;
      }

      return prev;
    },
  },
});
