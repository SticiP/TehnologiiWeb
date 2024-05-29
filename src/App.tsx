import React, { useEffect, useState } from 'react';
import { Layout, Button, Menu, Dropdown, Spin, theme } from 'antd';
import { Key } from 'antd/lib/table/interface';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import LoginForm from './LoginForm';
import store from './store';
import MainPageMenu from './MainPageMenu';
import PersonCard from './PersonCard';
import AddForm from './AddForm';
import Write from './Write';
import Read from './Read';
import app from './firebase';

const { Header, Sider, Content } = Layout;

const auth = getAuth(app);

const App = observer(() => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<Key>('1-1');
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const { token } = theme.useToken();

  const handleSelectedKeyChange = (key: Key) => {
    setSelectedKey(String(key));
  };

  useEffect(() => {
    const fetchUserName = async (email: string) => {
      const db = getDatabase(app);
      const emailKey = email.replace(/\./g, '_');
      const userRef = ref(db, `users/${emailKey}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserName(data.nume);
      } else {
        setUserName(email); // Fallback to email if name is not found
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserName(user.email || '');
        store.fetchPersonalData();
        store.fetchEmployeeData();
      } else {
        setUser(null);
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const renderContent = () => {
    if (store.loading) {
      return <Spin tip="Loading..." />;
    }

    if (!user) {
      return <LoginForm />;
    }

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
            {store.personalData.map((item, index) => (
              <PersonCard personId={item.id} key={index} type="Person" />
            ))}
          </div>
        );
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
            {store.employeeData.map((item, index) => (
              <PersonCard key={index} personId={item.id} type="Employee" />
            ))}
          </div>
        );
      case '2':
        return <AddForm />;
      case '3':
        return <Write />;
      case '4':
        return <Read />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {user && (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <MainPageMenu onMenuItemSelect={handleSelectedKeyChange} />
        </Sider>
      )}
      <Layout>
        <Header style={{ padding: 0, background: token.colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {user && (
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
          )}
          {user && (
            <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
              <Dropdown overlay={menu}>
                <Button type="text" icon={<UserOutlined />}>
                  {userName || user.email} <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: '0 50px',
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
});

export default App;
