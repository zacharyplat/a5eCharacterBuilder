import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { counterSlice } from "../features/counter/counterSlice";
import { dataEditorSlice } from "../features/dataEditor/dataEditorSlice";
import { quotesApiSlice } from "../features/quotes/quotesApiSlice";

const persistConfig = {
  key: "root",
  storage,
};

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  counterSlice,
  quotesApiSlice,
  dataEditorSlice,
);
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const ignoreReduxSerializableCheck = {
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  };

  const store = configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware(ignoreReduxSerializableCheck).concat(
        quotesApiSlice.middleware,
      );
    },
    preloadedState,
  });
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
export const persistor = persistStore(store);

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
