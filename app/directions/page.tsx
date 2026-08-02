import { Suspense } from 'react'
import { AccessSelection } from '@/components/access-selection'
import '../kiosk.css'

export const metadata = {
  title: 'Get Directions — Terminal Wayfinder',
  description: 'Choose elevator or escalator to navigate to your gate.',
}

export default function DirectionsPage() {
  return (
    <Suspense>
      <AccessSelection />
    </Suspense>
  )
}
