import { combineReducers, configureStore } from "@reduxjs/toolkit";
import selectedDateSlice from "./selectedDateSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  selectedDate: selectedDateSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)



// export const store = configureStore({
//   reducer: {
//     selectedDate: selectedDateSlice
//   },
// })
