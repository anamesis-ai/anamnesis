import { createClient } from '@sanity/client'
import { defineLive } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export const client = createClient({
  projectId,
  dataset,
  useCdn: false, // Set to true for production
  apiVersion: '2024-01-01',
  perspective: 'published',
})

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
})

// For preview/draft mode
export const previewClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_READ_TOKEN,
})