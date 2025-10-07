import {
  SET_MENU_ITEMS, ADD_MENU_ITEM, UPDATE_MENU_ITEM, DELETE_MENU_ITEM,
  SET_STUDENTS, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT,
  SET_COMPLAINTS, ADD_COMPLAINT, UPDATE_COMPLAINT, DELETE_COMPLAINT
} from './actions'

const initialState = {
  menuItems: [],
  students: [],
  complaints: []
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MENU_ITEMS: return { ...state, menuItems: action.payload }
    case ADD_MENU_ITEM: return { ...state, menuItems: [...state.menuItems, action.payload] }
    case UPDATE_MENU_ITEM: return { ...state, menuItems: state.menuItems.map(i => i._id === action.payload._id ? action.payload : i) }
    case DELETE_MENU_ITEM: return { ...state, menuItems: state.menuItems.filter(i => i._id !== action.payload) }

    case SET_STUDENTS: return { ...state, students: action.payload }
    case ADD_STUDENT: return { ...state, students: [...state.students, action.payload] }
    case UPDATE_STUDENT: return { ...state, students: state.students.map(s => s._id === action.payload._id ? action.payload : s) }
    case DELETE_STUDENT: return { ...state, students: state.students.filter(s => s._id !== action.payload) }

    case SET_COMPLAINTS: return { ...state, complaints: action.payload }
    case ADD_COMPLAINT: return { ...state, complaints: [...state.complaints, action.payload] }
    case UPDATE_COMPLAINT: return { ...state, complaints: state.complaints.map(c => c._id === action.payload._id ? action.payload : c) }
    case DELETE_COMPLAINT: return { ...state, complaints: state.complaints.filter(c => c._id !== action.payload) }

    default: return state
  }
}
