import React, { useState } from 'react';
import { Layout, Button, theme  } from 'antd';
import { Key } from 'antd/lib/table/interface';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import PersonCard from './PersonCard';
import AddForm from './AddForm';
import MainPageMenu from './MainPageMenu';
import Write from "./Write";
import Read from "./Read";
import PersonalData, { Employee, useEmployeeData, usePersonalData } from "./Person";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1-1'); 

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSelectedKeyChange = (key: Key) => {
    setSelectedKey(String(key));
  };

  const employee : Employee[] = useEmployeeData();
  const persons : PersonalData[] = usePersonalData();

  const renderContent = () => {
    switch (selectedKey) {
      case '1-1':
        return (
          <div
            style={{
              background: '#fff',
              padding: 24,
              minHeight: 280,
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            {persons.map((item, index) => (
              <PersonCard personId={item.id} key={index} type="Person" />
            ))}
          </div>
        )
      case '1-2':
        return (
          <div
            style={{
              background: '#fff',
              padding: 24,
              minHeight: 280,
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            {employee.map((item, index) => (
              <PersonCard key={index} personId={item.id} type="Employee" />
            ))}
          </div>
        );
      case '2':
        return <AddForm />;
      case '3':
        return <Write />;
      case '4' :
        return <Read />
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <MainPageMenu onMenuItemSelect={handleSelectedKeyChange} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}

          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: '0 50px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
    
  );
};

export default App;
