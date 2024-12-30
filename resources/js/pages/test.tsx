import { AppLayout } from '@/layouts/app'
import { DashboardLayout } from '@/layouts/app/dashboard'

export default function TestPage({ slug }: { slug: string }) {
  return <div>Test : {slug}</div>
}

TestPage.layout = [AppLayout, DashboardLayout]

TestPage.breadcrumb = {
  title: 'Test',
}
