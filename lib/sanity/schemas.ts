/**
 * Sanity Schema Definitions
 * 
 * These schemas should be added to your Sanity Studio project.
 * They define the content structure for the CMS.
 */

export const boxCycleSchema = {
  name: 'boxCycle',
  title: 'Box Cycle',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'quarter',
      title: 'Quarter',
      type: 'string',
      description: 'e.g., Q1 2026, Spring 2026',
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'cutoffDate',
      title: 'Cutoff Date',
      type: 'datetime',
    },
    {
      name: 'shipDate',
      title: 'Ship Date',
      type: 'datetime',
    },
    {
      name: 'isAvailable',
      title: 'Is Available',
      type: 'boolean',
      description: 'Is this box currently available for purchase?',
    },
    {
      name: 'digitalExtras',
      title: 'Digital Extras',
      type: 'object',
      fields: [
        {
          name: 'spotifyPlaylist',
          title: 'Spotify Playlist URL',
          type: 'url',
        },
        {
          name: 'qaSessions',
          title: 'Q&A Session Links',
          type: 'array',
          of: [{ type: 'url' }],
        },
        {
          name: 'downloads',
          title: 'Downloadable Content',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string' },
                { name: 'file', type: 'file' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const faqSchema = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Subscription', value: 'subscription' },
          { title: 'Shipping', value: 'shipping' },
          { title: 'Payment', value: 'payment' },
          { title: 'Gifting', value: 'gifting' },
          { title: 'Publishers', value: 'publishers' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order within category',
    },
  ],
}

export const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'image',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage?',
    },
  ],
}

export const pageContentSchema = {
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    {
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Box', value: 'box' },
          { title: 'Community', value: 'community' },
          { title: 'About', value: 'about' },
          { title: 'For Publishers', value: 'publishers' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'section',
      title: 'Section',
      type: 'string',
      description: 'Section identifier (e.g., hero, features, etc.)',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
}

