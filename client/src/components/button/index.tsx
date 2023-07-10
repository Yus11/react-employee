import React, { FC } from "react"
import { Button, Form } from "antd"
import { BaseButtonProps } from "antd/es/button/button"

export const BaseButton: FC<BaseButtonProps> = () => {
  return (
    <Form.Item>
      <Button/>
    </Form.Item>
  )
}
