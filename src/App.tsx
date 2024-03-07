import React, { useState } from 'react';
import { Layout, Menu, Button, theme  } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import Person, { PersonalData } from './Person';
import PersonCard from './PersonCard';
import AddPersonButton from './AddPersonButton';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const personsData: PersonalData  = {
    numePrenume : 'Stici Pavel',
    dataNasterii : '2024-02-21',
    varsta : 21,
    sex : 'Masculin',
    grupa : 'CR-221',
    email : 'pavelstici@my.erau.edu',
    telefon : '079639639',
    adresa : 'Str. Stefan cel Mare, nr. 12, Cluj-Napoca',
    codPostal : '400000'
  };

  const [persons, setPersons] = useState([new Person()]);
  persons[0].updatePersonalData(personsData);

  let tempPerson = new Person();

  const handleAddPerson = () => {
    const updatedPersons = [...persons, tempPerson];
    setPersons(updatedPersons);
    tempPerson = new Person();
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
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
            {persons.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>
        </Content>
      </Layout>
      <AddPersonButton person={tempPerson} onAddPerson={handleAddPerson} type={"Add New Person"} />
    </Layout>
    
  );
};

export default App;
