import React from 'react';
import { observer } from 'mobx-react';
import { Card, Descriptions } from 'antd';
import PersonModal from './PersonModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Person from './Person';

interface Props {
  person: Person;
}

const PersonCard = observer(({ person }: Props) => {
  return (
    <Card size="small">
      <Descriptions title="Informații student">
        {person.personalData.map(item => (
          <Descriptions.Item key={item.key} label={item.label}>
            {item.children}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <PersonModal person={person} />
    </Card>
  );
});

export default PersonCard;
