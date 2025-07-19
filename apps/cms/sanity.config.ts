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
