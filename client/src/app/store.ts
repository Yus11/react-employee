import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"

import { middlewareListener } from "./middleware/auth"
import { api } from "./services/api"
import auth from "./slices/auth/auth.slice"
import employees from "./slices/employees/employees.slice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    employees,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).prepend(middlewareListener.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
