import React, { useState } from 'react';
import { Card } from 'antd';
import PersonForm from './PersonForm';
import EmployeeForm from './EmployeeForm';


const tabList = [
  {
    key: 'tab1',
    tab: 'Person',
  },
  {
    key: 'tab2',
    tab: 'Employee',
  },
];

const AddForm = () => {

  const contentList: Record<string, React.ReactNode> = {
      tab1: <PersonForm />,
      tab2: <EmployeeForm />
  };

  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return (
    <div style={{
        background: '#fff',
        padding: 24,
        minHeight: 280,
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
      }}>
      <Card
        style={{ width: 'auto' }}
        title="Completează informațiile:"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </div>
  );
};

export default AddForm;
