import React, { useState } from 'react';
import type { DatePickerProps } from 'antd';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import store from './store';
import { PersonalData, Employee } from './Person';
import dayjs from 'dayjs';

interface Props {
  person: PersonalData | Employee;
  visible: boolean;
  onCancel: () => void;
  type: string;
  optional: () => void;
}

const PersonFormModal: React.FC<Props> = observer(({ person, visible, onCancel, type, optional }) => {
  const [formData, setFormData] = useState<PersonalData | Employee>(person);

  const handleOk = () => {
    if ('jobTitle' in formData) {
      store.updateEmployeeData(formData as Employee);
    } else {
      store.updatePersonalData(formData as PersonalData);
    }
    optional();
    onCancel();
  };

  const handleChange = (key: keyof (Employee), value: string | number | null) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setFormData(prevData => ({
      ...prevData,
      dataNasterii: Array.isArray(dateString) ? dateString[0] : dateString,
    }));
  };

  return (
    <Modal
      title={type}
      style={{ top: 20 }}
      open={visible}
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
        <Form.Item label="Email">
          <Input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
        </Form.Item>
        <Form.Item label="Telefon">
          <Input type="tel" value={formData.telefon} onChange={(e) => handleChange('telefon', e.target.value)} />
        </Form.Item>
        <Form.Item label="Adresă">
          <Input value={formData.adresa} onChange={(e) => handleChange('adresa', e.target.value)} />
        </Form.Item>
        {'jobTitle' in formData && (
          <>
            <Form.Item label="Job Title">
              <Input value={formData.jobTitle} onChange={(e) => handleChange('jobTitle', e.target.value)} />
            </Form.Item>
            <Form.Item label="Salary">
              <Input type="number" value={formData.salary.toString()} onChange={(e) => handleChange('salary', parseInt(e.target.value, 10))} />
            </Form.Item>
            <Form.Item label="Department">
              <Input value={formData.department} onChange={(e) => handleChange('department', e.target.value)} />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
});

export default PersonFormModal;
