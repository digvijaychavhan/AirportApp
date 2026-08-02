import { Suspense } from 'react'
import { DirectoryList } from '@/components/directory-list'

export const metadata = {
  title: 'Directory — Airport Kiosk',
  description: 'Browse airport facilities by category: dining, shopping, lounges, services and more.',
}

export default function DirectoryPage() {
  return (
    <Suspense>
      <DirectoryList />
    </Suspense>
  )
}
