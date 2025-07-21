"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Globe } from 'lucide-react'
import { DirectoryItem } from '@/lib/sanity.client'

interface DirectoryClientProps {
  items: DirectoryItem[]
  categories: Array<{
    id: string
    label: string
    emoji: string
  }>
}

export function DirectoryClient({ items, categories }: DirectoryClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory)

  return (
    <>
      {/* Category Tabs */}
      <div className="mb-8 not-prose">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2
                  ${activeCategory === category.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="text-lg">{category.emoji}</span>
                <span>{category.label}</span>
                <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">
                  {category.id === 'all' 
                    ? items.length 
                    : items.filter(item => item.category === category.id).length
                  }
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Directory Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 not-prose">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {activeCategory === 'all' 
              ? 'No directory items found.' 
              : `No items found in ${categories.find(c => c.id === activeCategory)?.label} category.`
            }
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Items will appear here once they're published in the CMS.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
          {filteredItems.map((item) => (
            <DirectoryItemCard key={item._id} item={item} categories={categories} />
          ))}
        </div>
      )}
    </>
  )
}

function DirectoryItemCard({ item, categories }: { item: DirectoryItem; categories: any[] }) {
  const categoryInfo = categories.find(c => c.id === item.category) || categories.find(c => c.id === 'other')!

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{categoryInfo.emoji}</span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {categoryInfo.label}
            </span>
          </div>
          {item.websiteUrl && (
            <a
              href={item.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          <Link 
            href={`/directory/${item.slug.current}`}
            className="hover:text-blue-600 transition-colors"
          >
            {item.title}
          </Link>
        </h3>

        {item.summary && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {item.summary}
          </p>
        )}

        <div className="flex items-center justify-between">
          <Link
            href={`/directory/${item.slug.current}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Learn more →
          </Link>
          
          {item.websiteUrl && (
            <a
              href={item.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm"
            >
              Visit site
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}