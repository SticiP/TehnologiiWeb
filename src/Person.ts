// src\Person.ts
import { action, makeAutoObservable } from 'mobx';

interface PersonalInfo {
  key: number;
  label: string;
  children: string;
}

class Person {
  personalData: PersonalInfo[] = [
    {
      key: 1,
      label: 'Nume/Prenume',
      children: 'Stici Pavel',
    },
    {
      key: 2,
      label: 'Data nașterii',
      children: '09.10.2002',
    },
    {
      key: 3,
      label: 'Vârsta',
      children: '21',
    },
    {
      key: 4,
      label: 'Sex',
      children: 'Masculin',
    },
    {
      key: 5,
      label: 'Grupă',
      children: 'CR-221',
    },
    {
      key: 6,
      label: 'Email',
      children: 'pavelstici@my.erau.edu',
    },
    {
      key: 7,
      label: 'Telefon',
      children: '+40 712 345 678',
    },
    {
      key: 8,
      label: 'Adresă',
      children: 'Str. Lalelelor, nr. 2, București',
    },
    {
      key: 9,
      label: 'Cod poștal',
      children: '010100',
    }
  ];

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  updatePersonalData(newData: PersonalInfo[]) {
    if (newData) {
      this.personalData = newData;
      console.log(this.personalData);
    } else {
      console.error('Eroare: newData este null sau indefinit.');
    }
  }
}

const person = new Person();
export default person;
