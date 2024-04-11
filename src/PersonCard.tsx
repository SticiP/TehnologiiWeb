import React from 'react';
import { observer } from 'mobx-react';
import { Card, Descriptions } from 'antd';
import EditPersonModal from './EditPersonModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Person from './Person';
import moment from 'moment';

interface Props {
  person: Person;
}

const PersonCard = observer(({ person }: Props) => {
  return (
    <Card size="small">
      <Descriptions title="Personal Data">
        {Object.entries(person.personalData).map(([key, value]) => (
          <Descriptions.Item key={key} label={key}>
            {key === 'dataNasterii' ? moment(value).format('DD/MM/YYYY') : value}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <EditPersonModal person={person} type="Edit Person Data" />
    </Card>
  );
});

export default PersonCard;
