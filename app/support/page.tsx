import '@/app/support.css'
import { SupportConnecting } from '@/components/support-connecting'

export const metadata = {
  title: 'Talk to Us — Airport Kiosk',
  description: 'Connecting you to an airport customer support representative via video call.',
}

export default function SupportPage() {
  return <SupportConnecting />
}
