import { getDirectoryItemBySlug, getAllDirectoryItemsForBuild, type DirectoryItem } from '@/lib/sanity.client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, Calendar, ArrowLeft } from 'lucide-react'
import { DirectoryItemStructuredData } from '@/components/seo/structured-data'

interface DirectoryItemPageProps {
  params: Promise<{ slug: string }>
}

const categories = [
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

export default async function DirectoryItemPage({ params }: DirectoryItemPageProps) {
  const { slug } = await params
  const item = await getDirectoryItemBySlug(slug)

  if (!item) {
    notFound()
  }

  const categoryInfo = categories.find(c => c.id === item.category) || categories.find(c => c.id === 'other')!
  
  const createdDate = new Date(item._createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://directorium.com'

  return (
    <>
      <DirectoryItemStructuredData
        title={item.title}
        description={item.summary || `Discover ${item.title} in our ${categoryInfo.label} directory.`}
        category={categoryInfo.label}
        websiteUrl={item.websiteUrl}
        url={`${baseUrl}/directory/${slug}`}
      />
      <div className="prose max-w-none">
      {/* Back to directory link */}
      <div className="mb-8">
        <Link 
          href="/directory"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Directory
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">{categoryInfo.emoji}</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {categoryInfo.label}
          </span>
        </div>

        <h1 className="mb-4">{item.title}</h1>

        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Added {createdDate}</span>
          </div>
        </div>

        {item.summary && (
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            {item.summary}
          </p>
        )}

        {/* Website Link */}
        {item.websiteUrl && (
          <div className="mb-8">
            <a
              href={item.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Visit Website
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </div>
        )}
      </header>

      {/* Content Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About this resource</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{categoryInfo.emoji}</span>
              <span className="text-gray-900">{categoryInfo.label}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Website</h3>
            {item.websiteUrl ? (
              <a
                href={item.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center"
              >
                {new URL(item.websiteUrl).hostname}
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            ) : (
              <span className="text-gray-500">Not available</span>
            )}
          </div>
        </div>
      </div>

      {/* Related Items */}
      <RelatedItems currentItem={item} />
      </div>
    </>
  )
}

async function RelatedItems({ currentItem }: { currentItem: DirectoryItem }) {
  // Get other items in the same category
  const allItems = await getAllDirectoryItemsForBuild()
  const relatedItems = allItems
    .filter(item => 
      item.category === currentItem.category && 
      item._id !== currentItem._id
    )
    .slice(0, 3)

  if (relatedItems.length === 0) {
    return null
  }

  const categoryInfo = categories.find(c => c.id === currentItem.category) || categories.find(c => c.id === 'other')!

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-lg font-semibold mb-6">More in {categoryInfo.label}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedItems.map((item) => (
          <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-gray-900 mb-2">
              <Link 
                href={`/directory/${item.slug.current}`}
                className="hover:text-blue-600 transition-colors"
              >
                {item.title}
              </Link>
            </h3>
            
            {item.summary && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {item.summary}
              </p>
            )}
            
            <Link
              href={`/directory/${item.slug.current}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Learn more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

// Generate static params for all directory items
export async function generateStaticParams() {
  const items = await getAllDirectoryItemsForBuild()
  
  return items.map((item) => ({
    slug: item.slug.current,
  }))
}

// Generate metadata for each directory item
export async function generateMetadata({ params }: DirectoryItemPageProps) {
  const { slug } = await params
  const item = await getDirectoryItemBySlug(slug)

  if (!item) {
    return {
      title: 'Directory Item Not Found',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const categoryInfo = categories.find(c => c.id === item.category) || categories.find(c => c.id === 'other')!
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://directorium.com'
  const description = item.summary || `Discover ${item.title} in our ${categoryInfo.label} directory.`

  return {
    title: `${item.title} - ${categoryInfo.label}`,
    description,
    keywords: [
      item.title.toLowerCase(),
      categoryInfo.label.toLowerCase(),
      'directory',
      'resource',
      'tool',
      'service',
      'curated',
      'directorium',
    ],
    openGraph: {
      title: item.title,
      description,
      type: 'website',
      url: `${baseUrl}/directory/${slug}`,
      images: [
        {
          url: '/og-directory-item.png',
          width: 1200,
          height: 630,
          alt: `${item.title} - ${categoryInfo.label}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description,
      images: ['/og-directory-item.png'],
    },
    alternates: {
      canonical: `${baseUrl}/directory/${slug}`,
    },
  }
}

// Enable ISR with revalidation
export const revalidate = 3600 // Revalidate every hour