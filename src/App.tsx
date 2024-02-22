import React, { useState } from 'react';
import { Layout, Menu, Button, theme, FloatButton  } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import Person from './Person';
import PersonCard from './PersonCard';
import AddPersonButton from './AddPersonButton';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  interface PersonalInfo {
    key: number;
    label: string;
    children: string;
  }

  const personsData: PersonalInfo[] = [
    {
      key: 1,
      label: 'Nume/Prenume',
      children: 'Stici Pavel',
    },
    {
      key: 2,
      label: 'Data nașterii',
      children: '09.10.2002',
    },
    {
      key: 3,
      label: 'Vârsta',
      children: '21',
    },
    {
      key: 4,
      label: 'Sex',
      children: 'Masculin',
    },
    {
      key: 5,
      label: 'Grupă',
      children: 'CR-221',
    },
    {
      key: 6,
      label: 'Email',
      children: 'pavelstici@my.erau.edu',
    },
    {
      key: 7,
      label: 'Telefon',
      children: '+40 712 345 678',
    },
    {
      key: 8,
      label: 'Adresă',
      children: 'Str. Lalelelor, nr. 2, București',
    },
    {
      key: 9,
      label: 'Cod poștal',
      children: '010100',
    }
  ];

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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
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
            {/* Afisează fiecare PersonCard pentru fiecare obiect Person */}
            {persons.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>
        </Content>
      </Layout>
      <AddPersonButton person={tempPerson} onAddPerson={handleAddPerson} />
    </Layout>
    
  );
};

export default App;
