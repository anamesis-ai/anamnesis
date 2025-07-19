import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Directorium CMS',

  projectId: 'your-project-id', // You'll need to replace this with actual project ID
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Enable live preview
  document: {
    productionUrl: async (prev, {document}) => {
      const slug = document?.slug?.current
      if (!slug || !document._type) {
        return prev
      }
      
      const baseUrl = 'http://localhost:3000'
      
      if (document._type === 'post') {
        return `${baseUrl}/posts/${slug}`
      }
      
      if (document._type === 'directoryItem') {
        return `${baseUrl}/directory/${slug}`
      }
      
      return prev
    },
  },
})