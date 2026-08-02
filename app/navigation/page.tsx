import { Suspense } from 'react'
import { NavigationMap } from '@/components/navigation-map'

export default function NavigationPage() {
  return (
    <Suspense>
      <NavigationMap />
    </Suspense>
  )
}
