import React, { useState } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select  } from 'antd';
import { observer } from 'mobx-react-lite';
import Person from './Person';
import dayjs from 'dayjs';

interface Props {
  person: Person;
}

const PersonModal: React.FC<Props> = observer(({ person }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(person.personalData.map(item => ({ ...item }))); // Copiez datele initiale pentru a le modifica separat

  const handleOk = () => {
    person.updatePersonalData(formData); // Actualizez datele în obiectul person
    setVisible(false);
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
      <Button type="primary" onClick={() => setVisible(true)}>
        Personal Data
      </Button>
      <Modal
        title="Edit Personal Data"
        style={{ top: 20 }}
        visible={visible} // Corectare: Proprietatea corectă este `visible` în loc de `open`
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
                <DatePicker
                  value={item.children ? dayjs(item.children, 'YYYY-MM-DD') : null} // moment este importat din pachetul 'moment'
                  onChange={(date, dateString) => handleChange(item.key, dateString)}
                />
              ) : item.type === 'number' ? (
                <Input type="number" value={item.children} onChange={(e) => handleChange(item.key, e.target.value)} />
              ) : item.type === 'select' && item.label === 'Sex' ? (
                <Select
                  value={item.children}
                  style={{ width: 120 }}
                  onChange={(value) => handleChange(item.key, value)}
                  options={[
                    { value: 'Masculin', label: 'Masculin' },
                    { value: 'Feminin', label: 'Feminin' },
                    { value: 'Ascuns', label: 'Ascuns' },
                  ]}
                />
              ) : (
                <Input type={item.type} value={item.children} onChange={(e) => handleChange(item.key, e.target.value)} />
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
});

export default PersonModal;
