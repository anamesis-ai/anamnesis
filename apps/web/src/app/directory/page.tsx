import { getAllDirectoryItems } from '@/lib/sanity.client'
import { DirectoryClient } from './directory-client'

// Generate metadata for SEO
export const metadata = {
  title: 'Directory',
  description: 'Discover curated resources, tools, and services across technology, business, education, health, entertainment, news, finance, travel, and more categories. Each listing has been carefully selected for quality and relevance.',
  keywords: [
    'directory',
    'resources',
    'tools',
    'services',
    'technology',
    'business',
    'education',
    'health',
    'entertainment',
    'news',
    'finance',
    'travel',
    'curated',
    'quality',
  ],
  openGraph: {
    title: 'Directory - Directorium',
    description: 'Discover curated resources, tools, and services across multiple categories.',
    type: 'website',
    images: ['/og-directory.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Directory - Directorium',
    description: 'Discover curated resources, tools, and services across multiple categories.',
    images: ['/og-directory.png'],
  },
  alternates: {
    canonical: '/directory',
  },
}

// Enable ISR with revalidation
export const revalidate = 3600 // Revalidate every hour

// Define category options
const categories = [
  { id: 'all', label: 'All', emoji: '🔍' },
  { id: 'technology', label: 'Technology', emoji: '💻' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'education', label: 'Education', emoji: '📚' },
  { id: 'health', label: 'Health', emoji: '🏥' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { id: 'news', label: 'News', emoji: '📰' },
  { id: 'finance', label: 'Finance', emoji: '💰' },
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'other', label: 'Other', emoji: '📁' },
]

export default async function DirectoryPage() {
  const items = await getAllDirectoryItems()

  return (
    <div className="prose max-w-none">
      <h1>Directory</h1>
      
      <p>
        Discover curated resources, tools, and services across various categories. 
        Each listing has been carefully selected for quality and relevance.
      </p>

      <DirectoryClient items={items} categories={categories} />
    </div>
  )
}

