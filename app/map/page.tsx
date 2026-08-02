import { AirportMap } from '@/components/airport-map'
import '../kiosk.css'
import '../map.css'

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>
}) {
  const { mode } = await searchParams
  const access = mode === 'escalator' ? 'escalator' : 'elevator'
  return <AirportMap mode={access} />
}
