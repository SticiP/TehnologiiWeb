import { action, makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';

export interface PersonalData {
  numePrenume: string;
  dataNasterii: string;
  varsta: number;
  sex: 'Masculin' | 'Feminin' | 'Altul';
  grupa: string;
  email: string;
  telefon: string;
  adresa: string;
  codPostal: string;
}

class Person {
  personalData: PersonalData;

  constructor() {
      this.personalData = {
      numePrenume: '',
      dataNasterii: dayjs().format('YYYY-MM-DD'),
      varsta: 0,
      sex: 'Altul',
      grupa: '',
      email: '',
      telefon: '',
      adresa: '',
      codPostal: ''
    };
    makeAutoObservable(this);
  }



  @action.bound
  updatePersonalData(newData: Partial<PersonalData>) {
    if (newData) {
      this.personalData = { ...this.personalData, ...newData };
      console.log(this.personalData);
    } else {
      console.error('Eroare: newData este null sau indefinit.');
    }
  }
}

export default Person;
