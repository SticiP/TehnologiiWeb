import { action, makeAutoObservable } from 'mobx';

interface PersonalInfo {
  key: number;
  label: string;
  children: string;
}

class Person {
  personalData: PersonalInfo[];

  constructor() {
    this.personalData = [
      {
        key: 1,
        label: 'Nume/Prenume',
        children: '',
      },
      {
        key: 2,
        label: 'Data nașterii',
        children: '',
      },
      {
        key: 3,
        label: 'Vârsta',
        children: '',
      },
      {
        key: 4,
        label: 'Sex',
        children: '',
      },
      {
        key: 5,
        label: 'Grupă',
        children: '',
      },
      {
        key: 6,
        label: 'Email',
        children: '',
      },
      {
        key: 7,
        label: 'Telefon',
        children: '',
      },
      {
        key: 8,
        label: 'Adresă',
        children: '',
      },
      {
        key: 9,
        label: 'Cod poștal',
        children: '',
      }
    ];
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

export default Person;
