import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import themeSlice from "./themeSlice";
import blogSlice from "./blogSlice";
import commentSlice from "./commentSlice";

// for get data (user data ...) login user
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  blog: blogSlice,
  comment: commentSlice,
  theme: themeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/* const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    blog: blogSlice,
  },
}); */

export default store;
