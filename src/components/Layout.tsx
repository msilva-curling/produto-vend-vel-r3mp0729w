import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/Header'
import { AppSidebar } from '@/components/AppSidebar'
import { Footer } from '@/components/Footer'

export default function Layout() {
  const location = useLocation()
  const isEditorOrViewer =
    location.pathname.startsWith('/editor') ||
    location.pathname.startsWith('/viewer')

  if (isEditorOrViewer) {
    return <Outlet />
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 bg-secondary">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
