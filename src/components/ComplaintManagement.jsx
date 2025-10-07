import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { api } from '../api/api'
import { store } from '../globalStore'

export default function ComplaintManagement() {
  const [complaints, setComplaints] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingComplaint, setEditingComplaint] = useState(null)
  const [formData, setFormData] = useState({ studentName: '', issue: '', status: 'Pending', date: '' })

  useEffect(()=>{ load() }, [])

  const load = async () => {
    const data = await api.getComplaints()
    setComplaints(data)
    store.dispatch({ type: 'SET_COMPLAINTS', payload: data })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingComplaint) {
      const updated = await api.updateComplaint(editingComplaint._id, formData)
      store.dispatch({ type: 'UPDATE_COMPLAINT', payload: updated })
      setComplaints(complaints.map(c=> c._id===updated._id ? updated : c))
    } else {
      const created = await api.createComplaint(formData)
      store.dispatch({ type: 'ADD_COMPLAINT', payload: created })
      setComplaints([...complaints, created])
    }
    setFormData({ studentName: '', issue: '', status: 'Pending', date: '' })
    setEditingComplaint(null)
    setShowForm(false)
  }

  const handleEdit = (c) => {
    setEditingComplaint(c)
    setFormData({ studentName: c.studentName, issue: c.issue, status: c.status, date: c.date })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    await api.deleteComplaint(id)
    store.dispatch({ type: 'DELETE_COMPLAINT', payload: id })
    setComplaints(complaints.filter(c=> c._id !== id))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-600">Complaint Management</h1>
        <button onClick={()=>setShowForm(!showForm)} className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700"><Plus className="w-5 h-5"/> Add Complaint</button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-2 border-orange-200">
          <h2 className="text-xl font-bold mb-4">{editingComplaint ? 'Edit' : 'Add'} Complaint</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Student Name" value={formData.studentName} onChange={(e)=>setFormData({...formData,studentName:e.target.value})} className="border rounded px-3 py-2" required />
            <input type="date" value={formData.date} onChange={(e)=>setFormData({...formData,date:e.target.value})} className="border rounded px-3 py-2" required />
            <textarea placeholder="Issue Description" value={formData.issue} onChange={(e)=>setFormData({...formData,issue:e.target.value})} className="border rounded px-3 py-2 col-span-2" rows="3" required />
            <select value={formData.status} onChange={(e)=>setFormData({...formData,status:e.target.value})} className="border rounded px-3 py-2" required>
              <option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Resolved">Resolved</option>
            </select>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{editingComplaint ? 'Update' : 'Create'}</button>
              <button type="button" onClick={()=>{setShowForm(false); setEditingComplaint(null); setFormData({studentName:'',issue:'',status:'Pending',date:''})}} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-orange-600 text-white"><tr><th className="p-3 text-left">Student Name</th><th className="p-3 text-left">Issue</th><th className="p-3 text-left">Date</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Actions</th></tr></thead>
          <tbody>
            {complaints.map((c, idx)=>(
              <tr key={c._id} className={idx%2===0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-3">{c.studentName}</td>
                <td className="p-3">{c.issue}</td>
                <td className="p-3">{c.date}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${c.status==='Resolved' ? 'bg-green-200 text-green-800' : c.status==='In Progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>{c.status}</span>
                </td>
                <td className="p-3">
                  <button onClick={()=>handleEdit(c)} className="text-blue-600 mr-3 hover:text-blue-800"><Edit className="w-5 h-5"/></button>
                  <button onClick={()=>handleDelete(c._id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
