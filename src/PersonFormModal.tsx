import React, { useState } from 'react';
import type { DatePickerProps } from 'antd';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import Person, { PersonalData } from './Person';
import dayjs from 'dayjs';

interface Props {
  person: Person;
  visible: boolean;
  onCancel: () => void;
  type: string;
  optional: () => void;
}

const PersonFormModal: React.FC<Props> = observer(({ person, visible, onCancel, type, optional }) => {
  const [formData, setFormData] = useState<PersonalData>(person.personalData);

  const handleOk = () => {
    person.updatePersonalData(formData);
    optional();
    onCancel();
  };

  const handleChange = (key: keyof PersonalData, value: string | number | null) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    person.personalData.dataNasterii = Array.isArray(dateString) ? dateString[0] : dateString;
  };

  return (
    <Modal
      title={type}
      style={{ top: 20 }}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Nume/Prenume">
          <Input value={formData.numePrenume} onChange={(e) => handleChange('numePrenume', e.target.value)} />
        </Form.Item>
        <Form.Item label="Data nașterii">
          <DatePicker
            value={dayjs(formData.dataNasterii, 'YYYY-MM-DD')}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item label="Vârsta">
          <Input type="number" value={formData.varsta.toString()} onChange={(e) => handleChange('varsta', parseInt(e.target.value, 10))} />
        </Form.Item>
        <Form.Item label="Sex">
          <Select
            value={formData.sex}
            style={{ width: 120 }}
            onChange={(value) => handleChange('sex', value)}
            options={[
              { value: 'Masculin', label: 'Masculin' },
              { value: 'Feminin', label: 'Feminin' },
              { value: 'Altul', label: 'Altul' },
            ]}
          />
        </Form.Item>
        <Form.Item label="Grupă">
          <Input value={formData.grupa} onChange={(e) => handleChange('grupa', e.target.value)} />
        </Form.Item>
        <Form.Item label="Email">
          <Input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
        </Form.Item>
        <Form.Item label="Telefon">
          <Input type="tel" value={formData.telefon} onChange={(e) => handleChange('telefon', e.target.value)} />
        </Form.Item>
        <Form.Item label="Adresă">
          <Input value={formData.adresa} onChange={(e) => handleChange('adresa', e.target.value)} />
        </Form.Item>
        <Form.Item label="Cod poștal">
          <Input type="number" value={formData.codPostal} onChange={(e) => handleChange('codPostal', e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default PersonFormModal;
