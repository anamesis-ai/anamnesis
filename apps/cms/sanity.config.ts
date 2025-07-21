import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { structure } from './structure';
import { templates } from './templates';

export default defineConfig({
  name: 'default',
  title: 'Directorium CMS',

  projectId: '72edep87',
  dataset: 'production',

  // Webhook configuration for revalidation:
  // To set up webhooks for automatic revalidation:
  // 1. Go to https://manage.sanity.io/projects/72edep87/api/webhooks
  // 2. Create a new webhook with:
  //    - Name: "Vercel Revalidation"
  //    - URL: https://anamnesis-cms.vercel.app/api/revalidate?secret=YOUR_REVALIDATE_SECRET
  //    - Trigger on: Create, Update, Delete
  //    - Filter: _type == "post" || _type == "directoryItem"
  //    - HTTP method: POST
  // 3. Replace YOUR_REVALIDATE_SECRET with the value from SANITY_REVALIDATE_SECRET env var
  // 4. Save and test the webhook
  //
  // ⚠️  SECURITY: Never commit secrets to code! Use environment variables only.

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

      const baseUrl =
        process.env.NODE_ENV === 'production'
          ? 'https://anamnesis-cms.vercel.app'
          : 'http://localhost:3000';

      if (document._type === 'post') {
        return `${baseUrl}/blog/${slug}`;
      }

      if (document._type === 'directoryItem') {
        return `${baseUrl}/directory/${slug}`;
      }

      return prev;
    },
  },
});
