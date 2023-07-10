import React, { FC } from "react"
import { Button, Layout, Space, Typography } from "antd"
import { Link } from "react-router-dom"

import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"

import { paths } from "../../../constants"

import styles from "./styles.module.css"

export const Header: FC = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={paths.home}>
          <Button type="link">
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </Button>
        </Link>
      </Space>
      <Space>
        <Link to={paths.register}>
          <Button type="link" className={styles.link} icon={<UserOutlined />}>
            Зарегистрироваться
          </Button>
        </Link>
        <Link to={paths.login}>
          <Button type="link" className={styles.link} icon={<LoginOutlined />}>
            Войти
          </Button>
        </Link>
      </Space>
    </Layout.Header>
  )
}
