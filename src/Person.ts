import { useEffect, useState } from 'react';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import app from './firebase';
import { action, makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';

export interface PersonalData {
  id: string;
  numePrenume: string;
  dataNasterii: string;
  varsta: number;
  sex: 'Masculin' | 'Feminin' | 'Altul';
  email: string;
  telefon: string;
  adresa: string;
}

export interface Employee extends PersonalData {
  jobTitle: string;
  salary: number;
  department: string;
}

export const useEmployeeData = () => {
  const [data, setData] = useState<Employee[]>([]);

  useEffect(() => {
    const dbRef = ref(getDatabase(app), 'Persons/employee');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const dataFromSnapshot = snapshot.val();
      if (dataFromSnapshot) {
        const mappedData: Employee[] = Object.entries(dataFromSnapshot).map(([key, value]) => ({
          id: key,
          ...(value as any)
        }));
        setData(mappedData);
      } else {
        console.log('No data available');
      }
    });

    return () => unsubscribe();
  }, []);

  return data;
};

export const usePersonalData = () => {
  const [data, setData] = useState<PersonalData[]>([]);

  useEffect(() => {
    const dbRef = ref(getDatabase(app), 'Persons/person');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const dataFromSnapshot = snapshot.val();
      if (dataFromSnapshot) {
        const mappedData: PersonalData[] = Object.entries(dataFromSnapshot).map(([key, value]) => ({
          id: key,
          ...(value as any)
        }));
        setData(mappedData);
      } else {
        console.log('No data available');
      }
    });

    return () => unsubscribe();
  }, []);

  return data;
};

export default PersonalData;
