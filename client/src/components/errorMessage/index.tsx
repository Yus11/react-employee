import React, { FC } from "react"
import { Alert } from "antd"

interface IErrorMessage {
  message?: string
}
export const ErrorMessage: FC<IErrorMessage> = ({ message }) => {
  if (!message) return null

  return <Alert message={message} type="error" />
}
