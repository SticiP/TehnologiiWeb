import React, { useState } from 'react';
import { Layout, Menu, Button, theme  } from 'antd';
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

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  interface PersonalInfo {
    key: number;
    label: string;
    children: string;
    type: 'text' | 'date' | 'number' | 'select' | 'email'; // Adaugă tipurile de date posibile
    validationRules?: RegExp; // Adaugă regulile de validare opționale
  }

  const personsData: PersonalInfo[] = [
    {
      key: 1,
      label: 'Nume/Prenume',
      children: 'Stici Pavel',
      type: 'text',
    },
    {
      key: 2,
      label: 'Data nașterii',
      children: '2024-02-21',
      type: 'date',
    },
    {
      key: 3,
      label: 'Vârsta',
      children: '21',
      type: 'number',
    },
    {
      key: 4,
      label: 'Sex',
      children: 'Masculin',
      type: 'select',
    },
    {
      key: 5,
      label: 'Grupă',
      children: 'CR-221',
      type: 'text',
    },
    {
      key: 6,
      label: 'Email',
      children: 'pavelstici@my.erau.edu',
      type: 'email'
    },
    {
      key: 7,
      label: 'Telefon',
      children: '079639639',
      type: 'number'
    },
    {
      key: 8,
      label: 'Adresă',
      children: 'Str. Lalelelor, nr. 2, București',
      type: 'text',
    },
    {
      key: 9,
      label: 'Cod poștal',
      children: '010100',
      type: 'number',
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
      <AddPersonButton person={tempPerson} onAddPerson={handleAddPerson} />
    </Layout>
    
  );
};

export default App;
