import { client, previewClient, sanityFetch } from './sanity'
import { draftMode } from 'next/headers'

// GROQ queries
const POSTS_QUERY = `
  *[_type == "post"] | order(publishDate desc, _createdAt desc) {
    _id,
    title,
    slug,
    publishDate,
    _createdAt,
    author->{
      _id,
      name,
      slug,
      image
    },
    tags,
    body[0...2]{
      ...
    }
  }
`

const DIRECTORY_ITEMS_QUERY = `
  *[_type == "directoryItem"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    summary,
    category,
    websiteUrl,
    logo,
    _createdAt
  }
`

const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishDate,
    _createdAt,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    tags,
    body[]{
      ...
    }
  }
`

const DIRECTORY_ITEM_BY_SLUG_QUERY = `
  *[_type == "directoryItem" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    category,
    websiteUrl,
    logo,
    _createdAt
  }
`

// Type definitions
export interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishDate: string
  _createdAt: string
  author: {
    _id: string
    name: string
    slug: { current: string }
    image?: any
    bio?: any
  }
  tags: string[]
  body: any[]
}

export interface DirectoryItem {
  _id: string
  title: string
  slug: { current: string }
  summary: string
  category: string
  websiteUrl: string
  logo?: any
  _createdAt: string
}

// Fetcher functions
export async function getAllPosts(): Promise<Post[]> {
  try {
    const isDraft = (await draftMode()).isEnabled
    
    if (isDraft) {
      return previewClient.fetch(POSTS_QUERY)
    }
    
    const result = await sanityFetch({
      query: POSTS_QUERY,
      tags: ['post'],
    })
    
    return result.data || []
  } catch (error) {
    console.warn('Failed to fetch posts from Sanity:', error)
    return []
  }
}

export async function getAllDirectoryItems(): Promise<DirectoryItem[]> {
  try {
    const isDraft = (await draftMode()).isEnabled
    
    if (isDraft) {
      return previewClient.fetch(DIRECTORY_ITEMS_QUERY)
    }
    
    const result = await sanityFetch({
      query: DIRECTORY_ITEMS_QUERY,
      tags: ['directoryItem'],
    })
    
    return result.data || []
  } catch (error) {
    console.warn('Failed to fetch directory items from Sanity:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const isDraft = (await draftMode()).isEnabled
  
  if (isDraft) {
    return previewClient.fetch(POST_BY_SLUG_QUERY, { slug })
  }
  
  const result = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ['post'],
  })
  
  return result.data || null
}

export async function getDirectoryItemBySlug(slug: string): Promise<DirectoryItem | null> {
  const isDraft = (await draftMode()).isEnabled
  
  if (isDraft) {
    return previewClient.fetch(DIRECTORY_ITEM_BY_SLUG_QUERY, { slug })
  }
  
  const result = await sanityFetch({
    query: DIRECTORY_ITEM_BY_SLUG_QUERY,
    params: { slug },
    tags: ['directoryItem'],
  })
  
  return result.data || null
}

// Build-time fetchers (don't use draftMode)
export async function getAllPostsForBuild(): Promise<Post[]> {
  try {
    return await client.fetch(POSTS_QUERY)
  } catch (error) {
    console.warn('Failed to fetch posts from Sanity, returning empty array:', error)
    return []
  }
}

export async function getAllDirectoryItemsForBuild(): Promise<DirectoryItem[]> {
  try {
    return await client.fetch(DIRECTORY_ITEMS_QUERY)
  } catch (error) {
    console.warn('Failed to fetch directory items from Sanity, returning empty array:', error)
    return []
  }
}

// Generic document fetcher by slug and type
export async function getDocBySlug(slug: string, docType: 'post' | 'directoryItem'): Promise<Post | DirectoryItem | null> {
  if (docType === 'post') {
    return getPostBySlug(slug)
  } else if (docType === 'directoryItem') {
    return getDirectoryItemBySlug(slug)
  }
  
  return null
}