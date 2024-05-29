import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Form, Select, DatePicker, InputNumber } from 'antd';
import PhoneInput from "antd-phone-input";
import dayjs from 'dayjs';
import * as Yup from 'yup';
import store from './store';
import { PersonalData } from './Person';

const validationSchema = Yup.object().shape({
  numePrenume: Yup.string().required('Nume/Prenume este obligatoriu'),
  email: Yup.string().email('Adresă de email invalidă').required('Email este obligatoriu'),
  telefon: Yup.string().required('Numărul de telefon este obligatoriu'),
});

const PersonForm = () => {
  const handleSubmit = (values: PersonalData) => {
    store.addPersonalData(values);
  };

  const initial: PersonalData = {
    id: '',
    numePrenume: '',
    dataNasterii: dayjs().format('YYYY-MM-DD'),
    varsta: 0,
    sex: 'Altul',
    email: '',
    telefon: '',
    adresa: '',
  };

  return (
    <Formik
      initialValues={initial}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
        <Form onFinish={handleSubmit}>
          <Form.Item label="Nume/Prenume" validateStatus={errors.numePrenume ? 'error' : ''} help={errors.numePrenume}>
            <Input 
              id='numePrenume' 
              name='numePrenume' 
              value={values.numePrenume} 
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Data nașterii">
            <DatePicker
              id='dataNasterii'
              name='dataNasterii'
              value={dayjs(values.dataNasterii, 'YYYY-MM-DD')}
              onChange={(date) => {
                if(date == null) date = dayjs();
                setFieldValue('dataNasterii', date.format('YYYY-MM-DD'))
              }}
            />
          </Form.Item>

          <Form.Item label="Vârsta">
            <InputNumber 
              id='varsta'
              name='varsta'
              type="number" 
              value={values.varsta}
              min={0} max={150}
              onChange={(value) => setFieldValue('varsta', value)} />
          </Form.Item>

          <Form.Item label="Sex">
            <Select
              value={values.sex}
              style={{ width: 120 }}
              onChange={(value) => setFieldValue('sex', value)}
              options={[
                { value: 'Masculin', label: 'Masculin' },
                { value: 'Feminin', label: 'Feminin' },
                { value: 'Altul', label: 'Altul' },
              ]}
            />
          </Form.Item>

          <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={values.email} 
              onChange={handleChange} 
            />
          </Form.Item>

          <Form.Item label="Telefon">
            <PhoneInput enableSearch
              id="telefon"
              name="telefon"
              value={values.telefon}
              onChange={(value) => setFieldValue('telefon', '+' + value.countryCode + value.areaCode + value.phoneNumber)}
            />
          </Form.Item>
          
          <Form.Item label="Adresă">
            <Input 
              value={values.adresa} 
              onChange={handleChange}
              id="adresa"
              name="adresa"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};

export default PersonForm;
