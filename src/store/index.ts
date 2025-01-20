import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import tasksReducer from "./tasksSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, tasksReducer);

const makeStore = () =>
  configureStore({
    reducer: {
      tasks: persistedReducer,
    },
  });

const store = makeStore();
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore);
export { store, persistor };
