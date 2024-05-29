import { observer } from 'mobx-react';
import { Card, Descriptions } from 'antd';
import EditPersonModal from './EditPersonModal';
import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import app from './firebase';
import moment from 'moment';
import { PersonalData, Employee, useEmployeeData, usePersonalData } from './Person';

interface Props {
  personId: string;
  type: 'Person' | 'Employee';
}

const PersonCard = observer(({ personId, type }: Props) => {
  const [person, setPerson] = useState<PersonalData | Employee | null>(null);
  const data = type === 'Employee' ? useEmployeeData() : usePersonalData(); // Alegem funcția de citire în funcție de tipul persoanei

  useEffect(() => {
    const fetchData = async () => {
      const selectedPerson = data.find((item) => item.id === personId); // Găsim persoana în datele citite
      if (selectedPerson) {
        setPerson(selectedPerson);
      }
    };

    fetchData();
  }, [personId, type, data]);

  if (!person) return null;

  return (
    <Card size="small">
      <Descriptions title={person.numePrenume}>
        {Object.entries(person).map(([key, value]) => (
          (key !== 'numePrenume' && key !== 'id') && (
            <Descriptions.Item key={key} label={key}>
              {key === 'dataNasterii' ? moment(value).format('DD/MM/YYYY') : (key === 'salary' ? `${value} lei` : value)}
            </Descriptions.Item>
          )
        ))}
      </Descriptions>
      <br />
      <EditPersonModal person={person} type="Edit Person Data" />
    </Card>
  );
});

export default PersonCard;
