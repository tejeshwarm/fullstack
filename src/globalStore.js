import rootReducer from './store/reducer'
import { createStore } from './store/store'

export const store = createStore(rootReducer)
