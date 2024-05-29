import React, { useEffect, useState } from 'react';
import { Layout, Button, Dropdown, Menu, Spin, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import store from './store';
import MainPageMenu from './MainPageMenu';
import PersonCard from './PersonCard';
import AddForm from './AddForm';
import Write from './Write';
import Read from './Read';
import app from './firebase';
import './global.css'; // Importă fișierul CSS global

const { Header, Sider, Content } = Layout;

const auth = getAuth(app);

const App = observer(() => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const { token } = theme.useToken();
  const navigate = useNavigate();

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
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  const menuItems = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const renderPersonList = (type: 'Person' | 'Employee') => (
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
      {type === 'Person'
        ? store.personalData.map((item, index) => (
            <PersonCard personId={item.id} key={index} type="Person" />
          ))
        : store.employeeData.map((item, index) => (
            <PersonCard key={index} personId={item.id} type="Employee" />
          ))}
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {user && (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <MainPageMenu />
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
              <Dropdown overlay={menuItems}>
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
          {store.loading ? (
            <div className="spin-container">
              <Spin size="large" />
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/persons" element={renderPersonList('Person')} />
              <Route path="/employees" element={renderPersonList('Employee')} />
              <Route path="/add" element={<AddForm />} />
              <Route path="/write" element={<Write />} />
              <Route path="/read" element={<Read />} />
              <Route path="/" element={user ? renderPersonList('Person') : <LoginForm />} />
            </Routes>
          )}
        </Content>
      </Layout>
    </Layout>
  );
});

export default App;
