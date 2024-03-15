import React, { useState } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import Person from './Person';
import PersonFormModal from './PersonFormModal';
import PersonFormikModal from './PersonFormikModal';

interface Props {
  person: Person;
  type : string;
}

const PersonModal: React.FC<Props> = observer(({ person, type }) => {
  const [visible, setVisible] = useState(false);


  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        {type}
      </Button>
      <PersonFormModal person={person} visible={visible} onCancel={handleCancel} type={type} optional={() => null} />
    </>
  );
});

export default PersonModal;
