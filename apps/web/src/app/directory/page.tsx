import { draftMode } from 'next/headers'
import { sanityFetch } from '@/lib/sanity'
import { SanityLive } from '@/lib/sanity'

const DIRECTORY_QUERY = `*[_type == "directoryItem"] | order(title asc) {
  _id,
  title,
  slug,
  summary,
  category,
  websiteUrl,
  logo
}`

export default async function DirectoryPage() {
  const { isEnabled: isDraftMode } = draftMode()
  
  const items = await sanityFetch({
    query: DIRECTORY_QUERY,
    perspective: isDraftMode ? 'previewDrafts' : 'published',
  })

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
      
      <h1 className="text-3xl font-bold mb-8">Directory</h1>
      
      {items.length === 0 ? (
        <p className="text-gray-600">No directory items found. Create some items in the CMS!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any) => (
            <div key={item._id} className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-3">{item.summary}</p>
              {item.category && (
                <span className="inline-block bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded mb-3">
                  {item.category}
                </span>
              )}
              {item.websiteUrl && (
                <a
                  href={item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      <SanityLive />
    </div>
  )
}