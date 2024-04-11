import React, { useState } from 'react';
import { Layout, Button, theme  } from 'antd';
import { Key } from 'antd/lib/table/interface';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import Person, { Employee } from './Person';
import PersonCard from './PersonCard';
import AddForm from './AddForm';
import MainPageMenu from './MainPageMenu';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1'); // Initially select '1'

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const personsData: Employee  = {
    numePrenume : 'Stici Pavel',
    dataNasterii : '2024-02-21',
    varsta : 21,
    sex : 'Masculin',
    email : 'pavelstici@my.erau.edu',
    telefon : '079639639',
    adresa : 'Str. Stefan cel Mare, nr. 12, Cluj-Napoca',
    jobTitle : 'Programator',
    salary : 3000,
    department : 'IT',
  };

  const [persons, setPersons] = useState([new Person()]);
  persons[0].updatePersonalData(personsData);

  let tempPerson = new Person();

  const handleAddPerson = () => {
    const updatedPersons = [...persons, tempPerson];
    setPersons(updatedPersons);
    tempPerson = new Person();
  }

  const handleSelectedKeyChange = (key: Key) => {
    setSelectedKey(String(key));
  };


  const renderContent = () => {
    switch (selectedKey) {
      case '1':
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
            {persons.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>
        );
      case '2':
        return <AddForm person={tempPerson} optional={handleAddPerson} />;
      case '3':
        return <div>Nav 3 Content</div>; // Placeholder for Nav 3 content
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
      {/* <AddPersonButton person={tempPerson} onAddPerson={handleAddPerson} type={"Add New Person"} /> */}
    </Layout>
    
  );
};

export default App;
