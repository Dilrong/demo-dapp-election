import React, { useState, useEffect } from "react";
import { Layout, Typography, Button, Table, Select, Space, Spin } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { connectorsByName, ConnectorNames } from "../utils/web3React";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useInactiveListener } from "../hooks/useInactiveListener";
import { useElection } from "../hooks/useContract";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Home: React.FC = () => {
  const { active, connector, account, activate, deactivate, error } =
    useWeb3React();

  const [activatingConnector, setActivatingConnector] = useState<any>();
  const [candidate, setCandidate] = useState([{}]);
  const [isLoading, setLoading] = useState(true);
  const [vote, setVote] = useState(0);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "VoteCount",
      dataIndex: "voteCount",
      key: "voteCount",
    },
  ];

  const electionContract = useElection();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const count = await electionContract.candidatesCount();
        candidate.pop();

        for (let i = 1; i <= count; i++) {
          const data = await electionContract.candidates(i);
          const json = {
            id: data.id.toNumber(),
            name: data.name,
            voteCount: data.voteCount.toNumber(),
          };
          setCandidate((candidate) => [...candidate, json]);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    getCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionContract]);

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  const getErrorMessage = (error: Error) => {
    if (error instanceof NoEthereumProviderError) {
      return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UserRejectedRequestErrorInjected) {
      return "Please authorize this website to access your Ethereum account.";
    } else {
      console.error(error);
      return "An unknown error occurred. Check the console for more details.";
    }
  };

  const handleChange = (value: any) => {
    setVote(value);
  };

  if (isLoading)
    return (
      <Spin
        style={{ position: "absolute", top: "50%", left: "50%" }}
        size="large"
        tip="Loading..."
      />
    );

  return (
    <Layout className="layout">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Title level={2} style={{ color: "white", margin: 0 }}>
          Election Demo Dapp
        </Title>
        <div style={{ flexGrow: 1 }} />
        <Space>
          {account === undefined ? (
            <Button
              onClick={() => {
                activate(
                  connectorsByName[ConnectorNames.Injected],
                  async (error: Error) => {
                    console.log(error);
                  }
                );
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              onClick={() => {
                deactivate();
              }}
            >
              {account === null
                ? "-"
                : account
                ? `${account.substring(0, 6)}...${account.substring(
                    account.length - 4
                  )}`
                : "account is null."}
            </Button>
          )}
          {active ? "🟢" : error ? `🔴 ${getErrorMessage(error)}` : "🟠"}
        </Space>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ minHeight: 280, paddingTop: 24 }}>
          <Space style={{ paddingBottom: 24 }}>
            <Select defaultValue="1" onChange={handleChange}>
              <Option value="1">dilrong</Option>
              <Option value="2">lucy</Option>
              <Option value="3">bob</Option>
            </Select>
            <Button
              type="primary"
              onClick={async () => {
                await electionContract.vote(vote);
              }}
            >
              Vote
            </Button>
          </Space>

          <Table columns={columns} dataSource={candidate} />
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
  );
};

export default Home;
