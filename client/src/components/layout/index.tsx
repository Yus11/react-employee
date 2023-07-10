import React, { FC, ReactNode } from "react"
import { Layout as AntdLayout } from "antd"

import { Header } from "./header"

import styles from "./styles.module.css"

interface ILayout {
  children: ReactNode
}

export const Layout: FC<ILayout> = ({children}) => {
  return (
    <div className={styles.main}>
      <Header/>
      <AntdLayout.Content>
        {children}
      </AntdLayout.Content>
    </div>
  );
}
