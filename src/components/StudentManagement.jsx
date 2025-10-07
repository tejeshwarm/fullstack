import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { api } from '../api/api'
import { store } from '../globalStore'

export default function StudentManagement() {
  const [students, setStudents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [formData, setFormData] = useState({ name: '', rollNo: '', room: '', mealPlan: '' })

  useEffect(()=>{ load() }, [])

  const load = async () => {
    const data = await api.getStudents()
    setStudents(data)
    store.dispatch({ type: 'SET_STUDENTS', payload: data })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingStudent) {
      const updated = await api.updateStudent(editingStudent._id, formData)
      store.dispatch({ type: 'UPDATE_STUDENT', payload: updated })
      setStudents(students.map(s=> s._id===updated._id ? updated : s))
    } else {
      const created = await api.createStudent(formData)
      store.dispatch({ type: 'ADD_STUDENT', payload: created })
      setStudents([...students, created])
    }
    setFormData({ name: '', rollNo: '', room: '', mealPlan: '' })
    setEditingStudent(null)
    setShowForm(false)
  }

  const handleEdit = (s) => {
    setEditingStudent(s)
    setFormData({ name: s.name, rollNo: s.rollNo, room: s.room, mealPlan: s.mealPlan })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    await api.deleteStudent(id)
    store.dispatch({ type: 'DELETE_STUDENT', payload: id })
    setStudents(students.filter(s=> s._id !== id))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-600">Student Management</h1>
        <button onClick={()=>setShowForm(!showForm)} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"><Plus className="w-5 h-5"/> Add Student</button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-2 border-green-200">
          <h2 className="text-xl font-bold mb-4">{editingStudent ? 'Edit' : 'Add'} Student</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Student Name" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} className="border rounded px-3 py-2" required />
            <input type="text" placeholder="Roll Number" value={formData.rollNo} onChange={(e)=>setFormData({...formData,rollNo:e.target.value})} className="border rounded px-3 py-2" required />
            <input type="text" placeholder="Room Number" value={formData.room} onChange={(e)=>setFormData({...formData,room:e.target.value})} className="border rounded px-3 py-2" required />
            <select value={formData.mealPlan} onChange={(e)=>setFormData({...formData,mealPlan:e.target.value})} className="border rounded px-3 py-2" required>
              <option value="">Select Meal Plan</option><option>Full Board</option><option>Breakfast + Dinner</option><option>Lunch + Dinner</option><option>Breakfast Only</option>
            </select>
            <div className="col-span-2 flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{editingStudent ? 'Update' : 'Create'}</button>
              <button type="button" onClick={()=>{setShowForm(false); setEditingStudent(null); setFormData({name:'',rollNo:'',room:'',mealPlan:''})}} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-600 text-white"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Roll No</th><th className="p-3 text-left">Room</th><th className="p-3 text-left">Meal Plan</th><th className="p-3 text-left">Actions</th></tr></thead>
          <tbody>
            {students.map((s, idx)=>(
              <tr key={s._id} className={idx%2===0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.rollNo}</td>
                <td className="p-3">{s.room}</td>
                <td className="p-3">{s.mealPlan}</td>
                <td className="p-3">
                  <button onClick={()=>handleEdit(s)} className="text-blue-600 mr-3 hover:text-blue-800"><Edit className="w-5 h-5"/></button>
                  <button onClick={()=>handleDelete(s._id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
