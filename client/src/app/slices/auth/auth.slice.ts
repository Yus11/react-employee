import { createSlice } from "@reduxjs/toolkit"
import { User } from "@prisma/client"

import { authApi } from "../../services/auth"
import { RootState } from "../../store"

interface InitialState {
  user: (User & { token: string }) | null
  isAuthorized: boolean
}

const initialState: InitialState = {
  user: null,
  isAuthorized: false,
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.user = payload
        state.isAuthorized = true
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
        state.user = payload
        state.isAuthorized = true
      })
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, { payload }) => {
        state.user = payload
        state.isAuthorized = true
      })
  },
})

export const { logOut } = slice.actions
export default slice.reducer
// export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized
export const selectUser = (state: RootState) => state.auth.user
