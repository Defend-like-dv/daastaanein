import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [

      // ─────────────────────────────────────────────────────────────
      // COLLECTION 1: Daastaanein (Song Stories)
      // ─────────────────────────────────────────────────────────────
      {
        name: 'daastaan',
        label: 'Daastaanein (Stories)',
        path: 'content/daastaanein',
        format: 'mdx',
        ui: {
          router: ({ document }) => `/story/${document._sys.filename}`,
        },
        fields: [
          // ── Identity ──
          {
            type: 'string',
            name: 'title',
            label: 'Song Title (English)',
            required: true,
            isTitle: true,
          },
          {
            type: 'string',
            name: 'titleHindi',
            label: 'Song Title (Hindi / Devanagari)',
          },
          {
            type: 'datetime',
            name: 'publishedAt',
            label: 'Published At',
          },
          {
            type: 'string',
            name: 'status',
            label: 'Status',
            options: [
              { label: 'Draft', value: 'draft' },
              { label: 'Published', value: 'published' },
              { label: 'Archived', value: 'archived' },
            ],
          },
          {
            type: 'boolean',
            name: 'isFeatured',
            label: 'Feature on Homepage Hero',
          },

          // ── Song Metadata ──
          { type: 'string', name: 'filmName',      label: 'Film Name' },
          { type: 'string', name: 'filmNameHindi', label: 'Film Name (Hindi)' },
          { type: 'number', name: 'year',           label: 'Release Year' },
          {
            type: 'string',
            name: 'era',
            label: 'Era',
            options: [
              { label: 'Golden Era (Pre-1970)', value: 'golden-era' },
              { label: '1970s', value: '1970s' },
              { label: '1980s', value: '1980s' },
              { label: '1990s', value: '1990s' },
              { label: '2000s', value: '2000s' },
              { label: 'Modern (2010+)', value: 'modern' },
            ],
          },
          {
            type: 'string',
            name: 'genre',
            label: 'Genre',
            list: true,
            options: [
              'romantic', 'sad', 'folk', 'classical',
              'devotional', 'patriotic', 'qawwali', 'dance', 'item',
            ],
          },
          {
            type: 'string',
            name: 'language',
            label: 'Language',
            options: [
              { label: 'Hindi', value: 'hindi' },
              { label: 'Urdu', value: 'urdu' },
              { label: 'Punjabi', value: 'punjabi' },
              { label: 'Bengali', value: 'bengali' },
              { label: 'Other', value: 'other' },
            ],
          },

          // ── People — use artist slugs matching collaborations.json ──
          {
            type: 'string',
            name: 'musicDirectors',
            label: 'Music Directors',
            list: true,
            description: 'Use slugs from collaborations.json, e.g. rd-burman',
          },
          {
            type: 'string',
            name: 'lyricists',
            label: 'Lyricists',
            list: true,
            description: 'e.g. gulzar, shailendra',
          },
          {
            type: 'string',
            name: 'singers',
            label: 'Singers',
            list: true,
          },
          {
            type: 'string',
            name: 'actors',
            label: 'Actors / Featured Artists',
            list: true,
          },

          // ── Content ──
          {
            type: 'string',
            name: 'excerpt',
            label: 'Excerpt (shown in cards & meta description)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'excerptHindi',
            label: 'Hindi Teaser Line (1 line, Devanagari)',
          },
          {
            type: 'image',
            name: 'coverImage',
            label: 'Cover Image',
          },
          {
            type: 'number',
            name: 'readTime',
            label: 'Read Time (minutes)',
          },

          // ── Media ──
          {
            type: 'string',
            name: 'youtubeId',
            label: 'YouTube Video ID',
            description: 'e.g. uujndcCqJY0 from youtube.com/watch?v=uujndcCqJY0',
          },
          {
            type: 'string',
            name: 'spotifyTrackId',
            label: 'Spotify Track ID (optional)',
          },

          // ── Attribution ──
          {
            type: 'string',
            name: 'authorType',
            label: 'Author Type',
            options: [
              { label: 'Editorial (Daastaanein Team)', value: 'editorial' },
              { label: 'Community Submission', value: 'community' },
            ],
          },
          { type: 'string', name: 'contributorName', label: 'Contributor Name' },
          { type: 'string', name: 'contributorCity', label: 'Contributor City' },

          // ── SEO ──
          {
            type: 'string',
            name: 'metaTitle',
            label: 'Meta Title',
            description: "Leave blank to auto-generate as: Story Behind '[Song]' — Film (Year) | Daastaanein",
          },
          {
            type: 'string',
            name: 'metaDescription',
            label: 'Meta Description',
            description: 'Leave blank to use excerpt',
            ui: { component: 'textarea' },
          },
          {
            type: 'image',
            name: 'ogImage',
            label: 'OG Image (leave blank to use cover image)',
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },

          // ── Story Body ──
          {
            type: 'rich-text',
            name: 'body',
            label: 'Story Content',
            isBody: true,
          },
        ],
      },

      // ─────────────────────────────────────────────────────────────
      // COLLECTION 2: People (Artists / Composers / Singers)
      // ─────────────────────────────────────────────────────────────
      {
        name: 'person',
        label: 'People (Artists)',
        path: 'content/people',
        format: 'mdx',
        ui: {
          router: ({ document }) => `/artist/${document._sys.filename}`,
        },
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Full Name',
            required: true,
            isTitle: true,
          },
          { type: 'string', name: 'nameHindi',   label: 'Name (Hindi / Devanagari)' },
          {
            type: 'string',
            name: 'knownRoles',
            label: 'Known Roles (across career)',
            list: true,
            options: [
              { label: 'Music Director', value: 'music-director' },
              { label: 'Singer',         value: 'singer' },
              { label: 'Lyricist',       value: 'lyricist' },
              { label: 'Actor',          value: 'actor' },
              { label: 'Tabla / Percussionist', value: 'percussionist' },
              { label: 'Orchestrator',   value: 'orchestrator' },
              { label: 'Other',          value: 'other' },
            ],
          },
          {
            type: 'string',
            name: 'activePeriod',
            label: 'Active Period',
            description: 'e.g. 1961–1994',
          },
          { type: 'image',  name: 'profileImage', label: 'Profile Image' },
          {
            type: 'string',
            name: 'shortBio',
            label: 'Short Bio (2-3 lines, shown on cards)',
            ui: { component: 'textarea' },
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Full Biography',
            isBody: true,
          },
        ],
      },

    ],
  },

  search: {
    tina: {
      indexerToken: process.env.NEXT_PUBLIC_TINA_SEARCH_TOKEN || '',
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
})
