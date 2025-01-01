import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: 'loi17jur',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
