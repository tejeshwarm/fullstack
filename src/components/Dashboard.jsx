import React from 'react'
import { Menu, Users, MessageSquare } from 'lucide-react'
import Link from '../router/Link'

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Hostel Mess Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <Menu className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold">Menu Items</h2>
          <p className="text-blue-100">Manage daily mess menu</p>
          <Link to="/menu" className="inline-block mt-4 bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50">View Menu</Link>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <Users className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold">Students</h2>
          <p className="text-green-100">Manage student meal plans</p>
          <Link to="/students" className="inline-block mt-4 bg-white text-green-600 px-4 py-2 rounded font-semibold hover:bg-green-50">View Students</Link>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <MessageSquare className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold">Complaints</h2>
          <p className="text-orange-100">Handle student complaints</p>
          <Link to="/complaints" className="inline-block mt-4 bg-white text-orange-600 px-4 py-2 rounded font-semibold hover:bg-orange-50">View Complaints</Link>
        </div>
      </div>
    </div>
  )
}
