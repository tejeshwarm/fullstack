// Action types & creators
export const ADD_MENU_ITEM = 'ADD_MENU_ITEM'
export const UPDATE_MENU_ITEM = 'UPDATE_MENU_ITEM'
export const DELETE_MENU_ITEM = 'DELETE_MENU_ITEM'
export const SET_MENU_ITEMS = 'SET_MENU_ITEMS'
export const ADD_STUDENT = 'ADD_STUDENT'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'
export const DELETE_STUDENT = 'DELETE_STUDENT'
export const SET_STUDENTS = 'SET_STUDENTS'
export const ADD_COMPLAINT = 'ADD_COMPLAINT'
export const UPDATE_COMPLAINT = 'UPDATE_COMPLAINT'
export const DELETE_COMPLAINT = 'DELETE_COMPLAINT'
export const SET_COMPLAINTS = 'SET_COMPLAINTS'

export const addMenuItem = (item) => ({ type: ADD_MENU_ITEM, payload: item })
export const updateMenuItem = (item) => ({ type: UPDATE_MENU_ITEM, payload: item })
export const deleteMenuItem = (id) => ({ type: DELETE_MENU_ITEM, payload: id })
export const setMenuItems = (items) => ({ type: SET_MENU_ITEMS, payload: items })

export const addStudent = (student) => ({ type: ADD_STUDENT, payload: student })
export const updateStudent = (student) => ({ type: UPDATE_STUDENT, payload: student })
export const deleteStudent = (id) => ({ type: DELETE_STUDENT, payload: id })
export const setStudents = (students) => ({ type: SET_STUDENTS, payload: students })

export const addComplaint = (c) => ({ type: ADD_COMPLAINT, payload: c })
export const updateComplaint = (c) => ({ type: UPDATE_COMPLAINT, payload: c })
export const deleteComplaint = (id) => ({ type: DELETE_COMPLAINT, payload: id })
export const setComplaints = (items) => ({ type: SET_COMPLAINTS, payload: items })
