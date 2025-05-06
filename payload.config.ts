// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Services } from './collections/Services.ts'
import { Locations } from './collections/Locations.ts'
import { BlogPosts } from './collections/BlogPosts.ts'
import { Testimonials } from './collections/Testimonials.ts'
import { ProgramTypes } from './collections/ProgramTypes.ts'
import { Clients } from './collections/Clients.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Testimonials, ProgramTypes, Clients, Services, Locations, BlogPosts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  cors: ['https://www.yourdomain.com', 'http://localhost:3000'],
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
