'use client'

import { useState } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'

export function DraftModeBanner() {
  const [isMinimized, setIsMinimized] = useState(false)

  const exitDraftMode = async () => {
    try {
      await fetch('/api/disable-draft')
      window.location.reload()
    } catch (error) {
      console.error('Failed to exit draft mode:', error)
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full shadow-lg transition-colors"
          title="Show preview banner"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Eye className="h-5 w-5" />
          <div>
            <span className="font-semibold">Preview Mode Active</span>
            <span className="ml-2 text-amber-100">
              You are viewing draft content from Sanity Studio
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="hover:bg-amber-600 p-1 rounded transition-colors"
            title="Minimize banner"
          >
            <EyeOff className="h-4 w-4" />
          </button>
          
          <button
            onClick={exitDraftMode}
            className="bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Exit Preview
          </button>
          
          <button
            onClick={() => setIsMinimized(true)}
            className="hover:bg-amber-600 p-1 rounded transition-colors ml-2"
            title="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}