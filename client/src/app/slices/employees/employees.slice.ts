import { Employee } from "@prisma/client"
import { createSlice } from "@reduxjs/toolkit"

import { getAllEmployees } from "../../services/employees"
import { RootState } from "../../store"

interface IInitialState {
  employees: Employee[] | null
}

const initialState: IInitialState = {
  employees: null,
}

const slice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(getAllEmployees.matchFulfilled, (state, { payload }) => {
      state.employees = payload
    })
  },
})

export default slice.reducer

export const employeesSelector = (state: RootState) => state.employees
