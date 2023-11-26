import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from "./userReducer"
import updateDataReducer from "./updateDataReducer"


const persistConfig = {
  key: 'root',
  storage:storageSession,
}
const rootReducer = combineReducers({ 
  user: userReducer,
  updateData:updateDataReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store= configureStore({
  reducer: persistedReducer,
  middleware:[thunk]
})
export const persistor = persistStore(store)