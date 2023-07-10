import React, { FC, useState } from "react"
import { Button, Card, Form, Input, Row, Typography } from "antd"
import { Link, useNavigate } from "react-router-dom"

import { useLoginMutation, UserData } from "../../app/services/auth"
import { Layout } from "../../components"
import { paths } from "../../constants"
import { isErrorWithMessage } from "../../utils"

export const Login: FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loginUser, loginUserResult] = useLoginMutation()
  async function login(payload: UserData) {
    try {
      await loginUser(payload)
        .unwrap()
        .finally(() => console.log("done"))
      console.log("ok")

      navigate("/")
    } catch (error) {
      console.log("no")
      if (isErrorWithMessage(error)) {
        setError(error.data.message)
      } else {
        setError("Unknown error")
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войти в систему" style={{ width: "30rem" }}>
          <Form onFinish={login} noValidate={true}>
            <Form.Item name="email" rules={[{ required: true, message: "Обязательное поле" }]}>
              <Input size="large" placeholder="Введите логин" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Обязательное поле" },
                () => ({
                  validator: (_, value) => {
                    if (value?.length && value.length < 3) {
                      return Promise.reject("Пароль должен быть длиннее 6 символов")
                    } else {
                      return Promise.resolve()
                    }
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="Введите пароль" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loginUserResult.isLoading} style={{ width: "100%" }} size="large">
              Войти
            </Button>
          </Form>
          <Row justify="center" style={{ marginTop: "20px" }}>
            <Typography.Text>
              Нет аккаунта? <Link to={paths.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
          </Row>
        </Card>
      </Row>
    </Layout>
  )
}
