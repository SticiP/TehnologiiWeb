import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { Formik, useFormik } from 'formik-antd';
import { observer } from 'mobx-react-lite';
import Person, { PersonalData } from './Person';

interface Props {
    person: Person;
  }

const MyFormInModal: React.FC<Props> = observer(({person}) => {
  const [visible, setVisible] = useState(false);

  const handleSubmit = (values : PersonalData , { resetForm } : any) => {
    console.log('Form values:', values);
    person.updatePersonalData(values);
    resetForm();
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal
        title="My Form Modal"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        
      </Modal>
    </div>
  );
});

export default MyFormInModal;
