import { action, makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';

export interface PersonalData {
  numePrenume: string;
  dataNasterii: string;
  varsta: number;
  sex: 'Masculin' | 'Feminin' | 'Altul';
  email: string;
  telefon: string;
  adresa: string;
  codPostal: string;
}

export interface Employee extends PersonalData {
  jobTitle: string;
  salary: number;
  department: string;
}

class Person {
  personalData: PersonalData | Employee;

  constructor(initialData?: PersonalData | Employee) {
      this.personalData = {
      numePrenume: '',
      dataNasterii: dayjs().format('YYYY-MM-DD'),
      varsta: 0,
      sex: 'Altul',
      email: '',
      telefon: '',
      adresa: '',
      codPostal: '',
    };
    makeAutoObservable(this);

    if (initialData) {
      this.updatePersonalData(initialData);
    }
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
