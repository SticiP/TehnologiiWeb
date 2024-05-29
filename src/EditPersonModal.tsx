import React, { useState } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { PersonalData, Employee } from './Person';
import PersonFormModal from './PersonFormModal';

interface Props {
  person: PersonalData | Employee;
  type: string;
}

const PersonModal: React.FC<Props> = observer(({ person, type }) => {
  const [visible, setVisible] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)} id={person.numePrenume}>
        {type}
      </Button>
      <PersonFormModal person={person} visible={visible} onCancel={handleCancel} type={type} optional={() => null} />
    </>
  );
});

export default PersonModal;
