import '@/app/support-call.css'
import { SupportVideoCall } from '@/components/support-video-call'

export const metadata = {
  title: 'Talk to Us — Active Call | Airport Kiosk',
  description: 'Active video call with an airport customer support executive.',
}

export default function SupportCallPage() {
  return <SupportVideoCall />
}
