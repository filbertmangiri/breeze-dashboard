import { AppLayout } from '@/layouts/app'
import { DashboardLayout } from '@/layouts/app/dashboard'

export default function DashboardPage() {
  return <div>Hello world</div>
}

DashboardPage.layout = [AppLayout, DashboardLayout]
