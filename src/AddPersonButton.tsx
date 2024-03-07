import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { observer } from 'mobx-react-lite';
import Person from './Person';
import PersonFormModal from './PersonFormModal';

interface Props {
  person: Person;
  onAddPerson: () => void;
  type: string;
}

const AddPersonButton: React.FC<Props> = observer(({ person, onAddPerson, type }) => {
  const [visible, setVisible] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <FloatButton onClick={() => setVisible(true)} />
      <PersonFormModal person={person} visible={visible} onCancel={handleCancel} type={type} optional={onAddPerson} />
    </>
  );
});

export default AddPersonButton;
