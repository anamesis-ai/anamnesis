import type { Meta, StoryObj } from '@storybook/react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu';
import { cn } from '@/lib/utils';
import React from 'react';

const meta: Meta<typeof NavigationMenu> = {
  title: 'UI/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A fully accessible navigation menu built with Radix UI primitives, featuring dropdown content areas and keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// List item component for consistent styling in examples
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
});
ListItem.displayName = "ListItem";

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/about">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/contact">
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithDropdown: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Anamnesis
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A modern content management and directory platform built with Next.js and Sanity.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                title="Blog"
                href="/blog"
              >
                Latest articles and tutorials about web development.
              </ListItem>
              <ListItem
                title="Directory"
                href="/directory"
              >
                Curated list of useful tools and resources.
              </ListItem>
              <ListItem
                title="Documentation"
                href="/docs"
              >
                Comprehensive guides and API reference.
              </ListItem>
              <ListItem
                title="Examples"
                href="/examples"
              >
                Code examples and implementation patterns.
              </ListItem>
              <ListItem
                title="Community"
                href="/community"
              >
                Join our community and get help from other developers.
              </ListItem>
              <ListItem
                title="Support"
                href="/support"
              >
                Get help and support for your projects.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/contact">
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const SimpleDropdown: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-2 p-4">
              <ListItem title="Web App" href="/web">
                Next.js web application with modern features.
              </ListItem>
              <ListItem title="CMS" href="/cms">
                Sanity-powered content management system.
              </ListItem>
              <ListItem title="API" href="/api">
                RESTful API for all your content needs.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/pricing">
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const MobileMenu: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <NavigationMenu className="w-full max-w-none">
      <NavigationMenuList className="flex-col space-x-0 space-y-1">
        <NavigationMenuItem className="w-full">
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full justify-start")} href="/">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-full">
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full justify-start")} href="/blog">
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-full">
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full justify-start")} href="/directory">
            Directory
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-full">
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-full justify-start")} href="/contact">
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};