import React, { FC } from "react"
import { Button, Card, Form, Input, Row, Typography } from "antd"
import { Link } from "react-router-dom"
import { User } from "@prisma/client"

import { useRegisterMutation } from "../../app/services/auth"
import { Layout } from "../../components"
import { paths } from "../../constants"

export const Register: FC = () => {
  const [registerAction, { isLoading }] = useRegisterMutation()
  async function register(payload: User) {
    console.log("333")
    try {
      console.log("2")
      await registerAction(payload).unwrap()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Регистрация аккаунта" style={{ width: "30rem" }}>
          <Form onFinish={register} noValidate={true}>
            <Form.Item name="name" rules={[{ required: true, message: "Обязательное поле" }]}>
              <Input type="text" size="large" placeholder="Имя" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: "Обязательное поле" }]}>
              <Input type="email" size="large" placeholder="E-mail" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Обязательное поле" },
                () => ({
                  validator: (_, value) => {
                    if (value?.length && value.length < 6) {
                      return Promise.reject("Пароль должен быть длиннее 6 символов")
                    } else {
                      return Promise.resolve()
                    }
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="Пароль" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Обязательное поле" },
                ({ getFieldValue }) => ({
                  validator: (_, value) => {
                    if (value && getFieldValue("password") !== value) {
                      return Promise.reject("Пароли должны совпадать")
                    } else {
                      return Promise.resolve()
                    }
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="Повторите пароль" />
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }} size="large">
              Зарегистрироваться
            </Button>
          </Form>
          <Row justify="center" style={{ marginTop: "20px" }}>
            <Typography.Text>
              Есть аккаунт? <Link to={paths.login}>Войдите в систему</Link>
            </Typography.Text>
          </Row>
        </Card>
      </Row>
    </Layout>
  )
}
