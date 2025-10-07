// Simulated API module - replace fetch calls with real backend endpoints
const delay = (ms) => new Promise(res => setTimeout(res, ms))

export const api = {
  getMenuItems: async () => {
    await delay(100)
    return [
      { _id: '1', name: 'Idli Sambar', category: 'Breakfast', price: 30, day: 'Monday' },
      { _id: '2', name: 'Chapati & Dal', category: 'Lunch', price: 50, day: 'Monday' }
    ]
  },
  createMenuItem: async (item) => ({ ...item, _id: Date.now().toString() }),
  updateMenuItem: async (id, item) => ({ ...item, _id: id }),
  deleteMenuItem: async (id) => ({ success: true }),

  getStudents: async () => {
    await delay(100)
    return [
      { _id: '1', name: 'Raj Kumar', rollNo: 'CS101', room: 'A-201', mealPlan: 'Full Board' },
      { _id: '2', name: 'Priya Singh', rollNo: 'CS102', room: 'B-105', mealPlan: 'Breakfast + Dinner' }
    ]
  },
  createStudent: async (s) => ({ ...s, _id: Date.now().toString() }),
  updateStudent: async (id, s) => ({ ...s, _id: id }),
  deleteStudent: async (id) => ({ success: true }),

  getComplaints: async () => {
    await delay(100)
    return [
      { _id: '1', studentName: 'Raj Kumar', issue: 'Food quality issue', status: 'Pending', date: '2024-01-15' },
      { _id: '2', studentName: 'Priya Singh', issue: 'Late serving', status: 'Resolved', date: '2024-01-14' }
    ]
  },
  createComplaint: async (c) => ({ ...c, _id: Date.now().toString() }),
  updateComplaint: async (id, c) => ({ ...c, _id: id }),
  deleteComplaint: async (id) => ({ success: true }),
}
