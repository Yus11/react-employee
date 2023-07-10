import { FC, useEffect } from "react"
import { Button, Table } from "antd"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { PlusCircleOutlined } from "@ant-design/icons"

import { useGetAllEmployeesQuery } from "../../app/services/employees"
import { selectUser } from "../../app/slices"
import { Layout } from "../../components"
import { paths } from "../../constants"

import { columns } from "./_constants"

export const Employees: FC = () => {
  const navigate = useNavigate()

  const user = useSelector(selectUser)

  const { data, isLoading } = useGetAllEmployeesQuery()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <Layout>
      <Button type="primary" icon={<PlusCircleOutlined />}>
        Добавить
      </Button>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={({ id }) => id}
        onRow={({ id }) => ({ onClick: () => navigate(`${paths.employee}/${id}`) })}
      />
    </Layout>
  )
}
