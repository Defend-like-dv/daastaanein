import type { Metadata } from 'next'
import CollaboratorMap from '@/components/CollaboratorMap'
import data from '@/data/collaborations.json'

export const metadata: Metadata = {
  title: 'Collaborator Map — Daastaanein',
  description:
    'An interactive network of Hindi cinema's greatest creative partnerships — music directors, lyricists, singers, and actors who shaped the golden era.',
}

export default function MapPage() {
  return (
    <CollaboratorMap data={data as any} />
  )
}
