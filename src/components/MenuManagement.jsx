import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { api } from '../api/api'
import { store } from '../globalStore'

export default function MenuManagement() {
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ name: '', category: '', price: '', day: '' })

  useEffect(() => { load() }, [])

  const load = async () => {
    const data = await api.getMenuItems()
    setItems(data)
    store.dispatch({ type: 'SET_MENU_ITEMS', payload: data })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingItem) {
      const updated = await api.updateMenuItem(editingItem._id, formData)
      store.dispatch({ type: 'UPDATE_MENU_ITEM', payload: updated })
      setItems(items.map(i => i._id === updated._id ? updated : i))
    } else {
      const created = await api.createMenuItem(formData)
      store.dispatch({ type: 'ADD_MENU_ITEM', payload: created })
      setItems([...items, created])
    }
    setFormData({ name: '', category: '', price: '', day: '' })
    setEditingItem(null)
    setShowForm(false)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({ name: item.name, category: item.category, price: item.price, day: item.day })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    await api.deleteMenuItem(id)
    store.dispatch({ type: 'DELETE_MENU_ITEM', payload: id })
    setItems(items.filter(i => i._id !== id))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Menu Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus className="w-5 h-5" /> Add Menu Item
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-2 border-blue-200">
          <h2 className="text-xl font-bold mb-4">{editingItem ? 'Edit' : 'Add'} Menu Item</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Item Name" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} className="border rounded px-3 py-2" required />
            <select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})} className="border rounded px-3 py-2" required>
              <option value="">Select Category</option><option value="Breakfast">Breakfast</option><option value="Lunch">Lunch</option><option value="Dinner">Dinner</option>
            </select>
            <input type="number" placeholder="Price" value={formData.price} onChange={(e)=>setFormData({...formData,price:e.target.value})} className="border rounded px-3 py-2" required />
            <select value={formData.day} onChange={(e)=>setFormData({...formData,day:e.target.value})} className="border rounded px-3 py-2" required>
              <option value="">Select Day</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option>
            </select>
            <div className="col-span-2 flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{editingItem ? 'Update' : 'Create'}</button>
              <button type="button" onClick={()=>{setShowForm(false); setEditingItem(null); setFormData({name:'',category:'',price:'',day:''})}} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr><th className="p-3 text-left">Item Name</th><th className="p-3 text-left">Category</th><th className="p-3 text-left">Price (₹)</th><th className="p-3 text-left">Day</th><th className="p-3 text-left">Actions</th></tr>
          </thead>
          <tbody>
            {items.map((item, idx)=>(
              <tr key={item._id} className={idx%2===0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">₹{item.price}</td>
                <td className="p-3">{item.day}</td>
                <td className="p-3">
                  <button onClick={()=>handleEdit(item)} className="text-blue-600 mr-3 hover:text-blue-800"><Edit className="w-5 h-5"/></button>
                  <button onClick={()=>handleDelete(item._id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
