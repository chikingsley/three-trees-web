// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { BlogPosts } from './collections/BlogPosts.ts'
import { Classes } from './collections/Classes.ts'
import { Clients } from './collections/Clients.ts'
import { Counties } from './collections/Counties.ts'
import { Locations } from './collections/Locations.ts'
import { Media } from './collections/Media.ts'
import { Payments } from './collections/Payments.ts'
import { ProgramTypes } from './collections/ProgramTypes.ts'
import { Programs } from './collections/Programs.ts'
import { ReferralSources } from './collections/ReferralSources.ts'
import { ReferralSourceTypes } from './collections/ReferralSourceTypes.ts'
import { Services } from './collections/Services.ts'
import { Testimonials } from './collections/Testimonials.ts'
import { Users } from './collections/Users.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    BlogPosts,
    Classes,
    Clients,
    Counties,
    Locations,
    Media,
    Payments,
    ProgramTypes,
    Programs,
    ReferralSources,
    ReferralSourceTypes,
    Services,
    Testimonials,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    idType: 'uuid',
  }),
  sharp,
  cors: ['https://www.yourdomain.com', 'http://localhost:3000'],
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
