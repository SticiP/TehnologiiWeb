import { action, makeAutoObservable } from 'mobx';

interface PersonalInfo {
  key: number;
  label: string;
  children: string;
  type: 'text' | 'date' | 'number' | 'select' | 'email'; // Adaugă tipurile de date posibile
  validationRules?: RegExp; // Adaugă regulile de validare opționale
}

class Person {
  personalData: PersonalInfo[];

  constructor() {
    this.personalData = [
      {
        key: 1,
        label: 'Nume/Prenume',
        children: '',
        type: 'text',
      },
      {
        key: 2,
        label: 'Data nașterii',
        children: '',
        type: 'date',
      },
      {
        key: 3,
        label: 'Vârsta',
        children: '',
        type: 'number',
      },
      {
        key: 4,
        label: 'Sex',
        children: '',
        type: 'select',
      },
      {
        key: 5,
        label: 'Grupă',
        children: '',
        type: 'text',
      },
      {
        key: 6,
        label: 'Email',
        children: '',
        type: 'email'
      },
      {
        key: 7,
        label: 'Telefon',
        children: '',
        type: 'number'
      },
      {
        key: 8,
        label: 'Adresă',
        children: '',
        type: 'text',
      },
      {
        key: 9,
        label: 'Cod poștal',
        children: '',
        type: 'number',
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
