import React from 'react'
import { Home, Menu as MenuIcon, Users, MessageSquare } from 'lucide-react'
import Router from './router/Router'
import Link from './router/Link'
import Dashboard from './components/Dashboard'
import MenuManagement from './components/MenuManagement'
import StudentManagement from './components/StudentManagement'
import ComplaintManagement from './components/ComplaintManagement'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hostel Mess Management</h1>
          <div className="flex gap-4">
            <Link to="/" className="flex items-center gap-2 hover:text-blue-300">
              <Home className="w-5 h-5" /> Dashboard
            </Link>
            <Link to="/menu" className="flex items-center gap-2 hover:text-blue-300">
              <MenuIcon className="w-5 h-5" /> Menu
            </Link>
            <Link to="/students" className="flex items-center gap-2 hover:text-blue-300">
              <Users className="w-5 h-5" /> Students
            </Link>
            <Link to="/complaints" className="flex items-center gap-2 hover:text-blue-300">
              <MessageSquare className="w-5 h-5" /> Complaints
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8">
        <Router>
          {(path) => {
            if (path === '/menu') return <MenuManagement />
            if (path === '/students') return <StudentManagement />
            if (path === '/complaints') return <ComplaintManagement />
            return <Dashboard />
          }}
        </Router>
      </main>
    </div>
  )
}
