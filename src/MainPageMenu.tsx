import React from 'react';

import { Menu } from 'antd';
import type { MenuProps } from 'antd';

import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

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
  getItem('Persons List', '1', <UserOutlined />, [
    getItem('Persons', '1-1'),
    getItem('Employees', '1-2'),
  ]),
  getItem('Add Person', '2', <UploadOutlined />),
  getItem('Write', '3', <VideoCameraOutlined />),
  getItem('Read', '4', <VideoCameraOutlined />),

];

const MainPageMenu: React.FC<{ onMenuItemSelect: (key: React.Key) => void }> = ({ onMenuItemSelect }) => {
      const onClick: MenuProps['onClick'] = (e) => {
        onMenuItemSelect(e.key);
      };
    
      return (
        <Menu
          onClick={onClick}
          theme='dark'
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      );
};

export default MainPageMenu;