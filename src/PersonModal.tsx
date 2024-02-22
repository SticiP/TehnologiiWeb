import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import Person from './Person';

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

  const handleChange = (key: number, value: string) => {
    const updatedFormData = formData.map(item => {
      if (item.key === key) {
        return { ...item, children: value };
      }
      return item;
    });
    setFormData(updatedFormData); // Actualizez starea locală cu noile date modificate
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
              <Input value={item.children} onChange={(e) => handleChange(item.key, e.target.value)} />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
});

export default PersonModal;
