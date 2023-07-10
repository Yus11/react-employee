import React from "react"
import { ConfigProvider, theme } from "antd"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { store } from "./app/store"
import { paths } from "./constants"
import { Employees, Login, Register } from "./pages"

import "./index.css"

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Employees />,
  },
  {
    path: paths.login,
    element: <Login />,
  },
  {
    path: paths.register,
    element: <Register />,
  },
])

const container = document.getElementById("root") as HTMLDivElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)
