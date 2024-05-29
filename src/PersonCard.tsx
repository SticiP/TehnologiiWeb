import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Descriptions, Button, Spin } from 'antd';
import EditPersonModal from './EditPersonModal';
import moment from 'moment';
import store from './store';

interface Props {
  personId: string;
  type: 'Person' | 'Employee';
}

const PersonCard = observer(({ personId, type }: Props) => {
  const data = type === 'Employee' ? store.employeeData : store.personalData;
  const person = data.find((item) => item.id === personId);

  const handleDelete = () => {
    store.deletePersonalData(personId, type);
  };

  if (store.loading) {
    return <Spin />;
  }

  if (!person) return null;

  return (
    <Card size="small">
      <Descriptions title={person.numePrenume}>
        {Object.entries(person).map(([key, value]) => (
          key !== 'numePrenume' && key !== 'id' && (
            <Descriptions.Item key={key} label={key}>
              {key === 'dataNasterii' ? moment(value).format('DD/MM/YYYY') : key === 'salary' ? `${value} lei` : value}
            </Descriptions.Item>
          )
        ))}
      </Descriptions>
      <br />
      <EditPersonModal person={person} type="Edit Person Data" />
      <Button type="primary" danger onClick={handleDelete} style={{ marginTop: '10px', float: 'right' }}>
        Delete
      </Button>
    </Card>
  );
});

export default PersonCard;
