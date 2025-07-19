import { draftMode } from 'next/headers'
import { sanityFetch, SanityLive } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const DIRECTORY_ITEM_QUERY = `*[_type == "directoryItem" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  summary,
  category,
  websiteUrl,
  logo
}`

interface DirectoryItemPageProps {
  params: { slug: string }
}

export default async function DirectoryItemPage({ params }: DirectoryItemPageProps) {
  const { isEnabled: isDraftMode } = draftMode()
  
  const item = await sanityFetch({
    query: DIRECTORY_ITEM_QUERY,
    params: { slug: params.slug },
    perspective: isDraftMode ? 'previewDrafts' : 'published',
  })

  if (!item) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isDraftMode && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <strong>Draft Mode Active</strong> - You are viewing draft content.{' '}
          <a href="/api/disable-draft" className="underline">
            Exit draft mode
          </a>
        </div>
      )}
      
      <Link href="/directory" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Back to Directory
      </Link>
      
      <article className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
        
        {item.category && (
          <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full mb-4">
            {item.category}
          </span>
        )}
        
        <p className="text-lg text-gray-700 mb-6">{item.summary}</p>
        
        {item.websiteUrl && (
          <a
            href={item.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Visit Website →
          </a>
        )}
      </article>
      
      <SanityLive />
    </div>
  )
}