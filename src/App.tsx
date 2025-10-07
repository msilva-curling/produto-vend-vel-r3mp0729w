import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import LoginPage from './pages/auth/Login'
import SignUpPage from './pages/auth/SignUp'
import TemplatesPage from './pages/dashboards/Templates'
import EditorPage from './pages/dashboards/Editor'
import ViewerPage from './pages/dashboards/Viewer'
import SettingsPage from './pages/Settings'
import HelpPage from './pages/Help'
import { useAuthStore } from './stores/authStore'
import { ReactNode } from 'react'
import SettingsLayout from './pages/settings/Layout'
import DataSourcesPage from './pages/settings/DataSources'
import ReportsPage from './pages/settings/Reports'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Index />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/editor/:id" element={<EditorPage />} />
          <Route path="/viewer/:id" element={<ViewerPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<SettingsPage />} />
            <Route path="data-sources" element={<DataSourcesPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
