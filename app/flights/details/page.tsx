import { Suspense } from 'react'
import { FlightDetails } from '@/components/flight-details'

export const metadata = {
  title: 'Flight Details — Terminal Wayfinder',
  description: 'View full details for your flight including gate, boarding time, and status.',
}

export default function FlightDetailsPage() {
  return (
    <Suspense>
      <FlightDetails />
    </Suspense>
  )
}
