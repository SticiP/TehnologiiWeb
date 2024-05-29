import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem(
    <span>
      <Link to="/persons">Persons List</Link>
    </span>,
    '1',
    <UserOutlined />,
    [
      getItem(
        <span>
          <Link to="/persons">Persons</Link>
        </span>,
        '1-1'
      ),
      getItem(
        <span>
          <Link to="/employees">Employees</Link>
        </span>,
        '1-2'
      ),
    ]
  ),
  getItem(
    <span>
      <Link to="/add">Add Person</Link>
    </span>,
    '2',
    <UploadOutlined />
  ),
  getItem(
    <span>
      <Link to="/write">Write</Link>
    </span>,
    '3',
    <VideoCameraOutlined />
  ),
  getItem(
    <span>
      <Link to="/read">Read</Link>
    </span>,
    '4',
    <VideoCameraOutlined />
  ),
];

const MainPageMenu: React.FC = () => (
  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
);

export default MainPageMenu;
