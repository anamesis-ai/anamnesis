import { defineField, defineType } from 'sanity'

export const socialMedia = defineType({
  name: 'socialMedia',
  title: 'Social Media Post',
  type: 'document',
  icon: () => '📱',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Internal reference name for this social media campaign',
      validation: (rule) => rule.required().max(100)
    }),
    
    defineField({
      name: 'relatedPost',
      title: 'Related Blog Post',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'The blog post this social media content is promoting',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'status',
      title: 'Campaign Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Scheduled', value: 'scheduled' },
          { title: 'Published', value: 'published' },
          { title: 'Cancelled', value: 'cancelled' }
        ],
        layout: 'radio'
      },
      initialValue: 'draft',
      validation: (rule) => rule.required()
    }),

    defineField({
      name: 'scheduledDate',
      title: 'Scheduled Publication Date',
      type: 'datetime',
      description: 'When this content should be posted to social media',
      validation: (rule) => rule.min(new Date().toISOString()).error('Scheduled date must be in the future')
    }),

    defineField({
      name: 'platforms',
      title: 'Platform Content',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'platformPost',
          title: 'Platform Post',
          fields: [
            defineField({
              name: 'platform',
              title: 'Social Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Threads', value: 'threads' },
                  { title: 'Mastodon', value: 'mastodon' }
                ]
              },
              validation: (rule) => rule.required()
            }),
            
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'text',
              rows: 4,
              description: 'Platform-specific caption and messaging',
              validation: (rule) => rule.required().max(500)
            }),
            
            defineField({
              name: 'hashtags',
              title: 'Hashtags',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Relevant hashtags for this platform (without # symbol)',
              options: {
                layout: 'tags'
              }
            }),
            
            defineField({
              name: 'customImage',
              title: 'Custom Image',
              type: 'image',
              description: 'Optional: Override the blog post image for this platform',
              options: {
                hotspot: true
              }
            }),
            
            defineField({
              name: 'includeLink',
              title: 'Include Link to Post',
              type: 'boolean',
              description: 'Whether to include a link back to the original blog post',
              initialValue: true
            }),
            
            defineField({
              name: 'platformSpecificOptions',
              title: 'Platform Options',
              type: 'object',
              fields: [
                defineField({
                  name: 'twitterThread',
                  title: 'Twitter Thread',
                  type: 'boolean',
                  description: 'Break this into a Twitter thread if over character limit',
                  hidden: ({ parent }) => parent?.platform !== 'twitter'
                }),
                
                defineField({
                  name: 'linkedinArticle',
                  title: 'LinkedIn Article Link',
                  type: 'boolean',
                  description: 'Post as LinkedIn article promotion',
                  hidden: ({ parent }) => parent?.platform !== 'linkedin'
                }),
                
                defineField({
                  name: 'instagramStories',
                  title: 'Also Post to Stories',
                  type: 'boolean',
                  description: 'Also create an Instagram Stories version',
                  hidden: ({ parent }) => parent?.platform !== 'instagram'
                })
              ]
            })
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'caption',
              media: 'customImage'
            },
            prepare(selection) {
              const { title, subtitle } = selection
              const platformNames = {
                twitter: 'Twitter/X',
                linkedin: 'LinkedIn', 
                facebook: 'Facebook',
                instagram: 'Instagram',
                threads: 'Threads',
                mastodon: 'Mastodon'
              }
              return {
                title: platformNames[title as keyof typeof platformNames] || title,
                subtitle: subtitle ? `${subtitle.substring(0, 60)}...` : 'No caption'
              }
            }
          }
        }
      ],
      validation: (rule) => rule.min(1).error('Add at least one platform')
    }),

    defineField({
      name: 'notes',
      title: 'Campaign Notes',
      type: 'text',
      description: 'Internal notes about this social media campaign'
    }),

    defineField({
      name: 'analytics',
      title: 'Performance Tracking',
      type: 'object',
      fields: [
        defineField({
          name: 'trackingEnabled',
          title: 'Enable Analytics Tracking',
          type: 'boolean',
          description: 'Track performance metrics for this campaign',
          initialValue: true
        }),
        
        defineField({
          name: 'utmCampaign',
          title: 'UTM Campaign Name',
          type: 'string',
          description: 'UTM campaign parameter for link tracking'
        }),
        
        defineField({
          name: 'goals',
          title: 'Campaign Goals',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  'Brand Awareness',
                  'Website Traffic',
                  'Lead Generation',
                  'Engagement',
                  'Content Promotion'
                ]
              }
            }
          ]
        })
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      relatedPostTitle: 'relatedPost.title',
      scheduledDate: 'scheduledDate',
      status: 'status',
      platforms: 'platforms'
    },
    prepare(selection) {
      const { title, relatedPostTitle, scheduledDate, status, platforms } = selection
      const platformCount = platforms?.length || 0
      const scheduledText = scheduledDate 
        ? new Date(scheduledDate).toLocaleDateString()
        : 'Not scheduled'
      
      return {
        title: title,
        subtitle: `${relatedPostTitle} • ${platformCount} platforms • ${scheduledText}`,
        media: () => '📱'
      }
    }
  },

  orderings: [
    {
      title: 'Scheduled Date',
      name: 'scheduledDateAsc',
      by: [{ field: 'scheduledDate', direction: 'asc' }]
    },
    {
      title: 'Created Date',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }]
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }]
    }
  ]
})