import React from "react";
import { Layout, Typography, Button, List, Select, Space } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import "./App.css";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

function App() {
  return (
    <>
      <Layout className="layout">
        <Header style={{ display: "flex", alignItems: "center" }}>
          <Title level={2} style={{ color: "white", margin: 0 }}>
            Election Demo Dapp
          </Title>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <List
              header={<Title level={4}>Election Results</Title>}
              bordered
              // renderItem={<List.Item></List.Item>}
            />
            <Space style={{ paddingTop: 24 }}>
              <Select defaultValue="lucy" onChange={handleChange}>
                <Option value="lucy">lucy</Option>
              </Select>
              <Button type="primary">Vote</Button>
            </Space>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <Button
            shape="circle"
            icon={<GithubOutlined />}
            onClick={() => {
              document.location.href =
                "https://github.com/Dilrong/demo-dapp-election";
            }}
          />
        </Footer>
      </Layout>
    </>
  );
}

export default App;
