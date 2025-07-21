import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with header, content, and footer sections for organizing related information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the card',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area where you can put any content you want.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Setup</CardTitle>
        <CardDescription>Get started with your new project in minutes.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Follow the setup guide to configure your development environment and start building.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Get Started</Button>
      </CardFooter>
    </Card>
  ),
};

export const BlogCard: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Getting Started with Next.js</CardTitle>
        <CardDescription>Published on January 15, 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Learn the fundamentals of Next.js and how to build modern web applications with React.
        </p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Next.js</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Read More</Button>
      </CardFooter>
    </Card>
  ),
};

export const DirectoryCard: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">V</span>
          </div>
          Vercel
        </CardTitle>
        <CardDescription>Platform for frontend frameworks and static sites</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">
          Deploy web projects with zero configuration and optimal performance.
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">Technology</span>
          <a 
            href="#" 
            className="text-blue-600 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            vercel.com →
          </a>
        </div>
      </CardContent>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: (args) => (
    <Card {...args} className="w-[250px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Total Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">12,847</div>
        <p className="text-sm text-green-600 flex items-center mt-1">
          <span className="mr-1">↗</span>
          +12% from last month
        </p>
      </CardContent>
    </Card>
  ),
};

export const MinimalCard: Story = {
  render: (args) => (
    <Card {...args} className="w-[300px]">
      <CardContent className="pt-6">
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};