"use client"

import { useState } from "react"
import { Menu, X, Home, Book, FileText, Zap } from "lucide-react"
// import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

interface DocsLayoutProps {
  children: React.ReactNode
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Getting Started", href: "/docs/getting-started", icon: Zap },
    { name: "API Reference", href: "/docs/api", icon: Book },
    { name: "Guides", href: "/docs/guides", icon: FileText },
  ]

  return (
    <div className="h-screen flex overflow-hidden bg-white" role="application">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 flex z-40 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <Sidebar navigation={navigation} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          <Sidebar navigation={navigation} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Sticky header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1">
                <nav className="flex space-x-8">
                  <a href="/docs" className="text-sm font-medium text-gray-900 hover:text-gray-700">
                    Documentation
                  </a>
                  <a href="/api" className="text-sm font-medium text-gray-900 hover:text-gray-700">
                    API
                  </a>
                  <a href="/examples" className="text-sm font-medium text-gray-900 hover:text-gray-700">
                    Examples
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content pane */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none" role="main">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function Sidebar({ navigation }: { navigation: any[] }) {
  return (
    <aside className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white" role="navigation" aria-label="Main navigation">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-6">
          <div className="text-xl font-bold text-gray-900">Directorium</div>
        </div>
        <nav className="mt-8 flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <Icon className="text-gray-400 mr-3 flex-shrink-0 h-5 w-5" />
                {item.name}
              </a>
            )
          })}
        </nav>
        
        {/* Additional navigation sections */}
        <div className="px-4 mt-8">
          <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Directory
          </h3>
          <nav className="mt-2 space-y-1">
            <a href="/directory" className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              Technology
            </a>
            <a href="/directory" className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              Business
            </a>
            <a href="/directory" className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              Education
            </a>
          </nav>
        </div>

        <div className="px-4 mt-8">
          <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Blog
          </h3>
          <nav className="mt-2 space-y-1">
            <a href="/blog" className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              All Posts
            </a>
            <a href="/blog" className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              Recent Posts
            </a>
          </nav>
        </div>
      </div>
    </aside>
  )
}