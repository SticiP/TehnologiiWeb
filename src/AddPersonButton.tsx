import React, { useState } from 'react';
import { Modal, Form, Input, FloatButton, Button, DatePicker, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import Person from './Person';

interface Props {
  person: Person;
  onAddPerson: () => void;
}

const AddPersonButton: React.FC<Props> = observer(({ person, onAddPerson }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(person.personalData.map(item => ({ ...item })));

  const handleOk = () => {
    person.updatePersonalData(formData);
    setVisible(false);
    onAddPerson();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = (key: number, value: string | string[]) => {
    let convertedValue: string;
    if (typeof value === 'string') {
      convertedValue = value; // Dacă este deja un șir, nu trebuie să facem nimic
    } else {
      convertedValue = value[0]; // Dacă este un array, luăm doar primul element
    }
  
    const updatedFormData = formData.map((item) => {
      if (item.key === key) {
        return { ...item, children: convertedValue };
      }
      return item;
    });
    setFormData(updatedFormData);
  };

  return (
    <>
      <FloatButton onClick={() => setVisible(true)} />
      <Modal
        title="Add Person"
        style={{ top: 20 }}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical">
          {formData.map((item) => (
            <Form.Item key={item.key} label={item.label}>
              {item.type === 'date' ? (
                <DatePicker onChange={(date, dateString) => handleChange(item.key, dateString)} />
              ) : item.type === 'number' ? (
                <Input type="number" onChange={(e) => handleChange(item.key, e.target.value)} />
              ) : item.type === 'select' && item.label === 'Sex' ? (
                <Select
                  defaultValue="Masculin"
                  style={{ width: 120 }}
                  onChange={(value) => handleChange(item.key, value)}
                  options={[
                    { value: 'Masculin', label: 'Masculin' },
                    { value: 'Feminin', label: 'Feminin' },
                    { value: 'Ascuns', label: 'Ascuns' },
                  ]}
                />
              ) : (
                <Input type={item.type} onChange={(e) => handleChange(item.key, e.target.value)} />
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
});

export default AddPersonButton;
