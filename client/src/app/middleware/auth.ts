import { createListenerMiddleware } from "@reduxjs/toolkit"

import { authApi } from "../services/auth"

export const middlewareListener = createListenerMiddleware()

middlewareListener.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async ({ payload }, { cancelActiveListeners }) => {
    cancelActiveListeners()

    payload.token && localStorage.setItem("token", payload.token)
  },
})
