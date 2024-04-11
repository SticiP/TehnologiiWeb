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
}

export interface Employee extends PersonalData {
  jobTitle: string;
  salary: number;
  department: string;
}

const data1: PersonalData = {
  numePrenume: '',
  dataNasterii: dayjs().format('YYYY-MM-DD'),
  varsta: 0,
  sex: 'Altul',
  email: '',
  telefon: '',
  adresa: '',
};

const data2: Employee = {
  numePrenume: '',
  dataNasterii: dayjs().format('YYYY-MM-DD'),
  varsta: 0,
  sex: 'Altul',
  email: '',
  telefon: '',
  adresa: '',
  jobTitle: '',
  salary: 0,
  department: '',
}

export class Person {
  personalData: PersonalData | Employee;

  constructor(initialData?: PersonalData | Employee) {

    if (initialData) {
      this.personalData = initialData;
    } else {
      this.personalData = data1;
    }
    
    makeAutoObservable(this);

    if (initialData) {
      this.updatePersonalData(initialData);
    }
  }



  @action.bound
  updatePersonalData(newData: Partial<PersonalData>) {
    if (newData) {
      this.personalData = { ...this.personalData, ...newData };
      // console.log(this.personalData);
    } else {
      console.error('Eroare: newData este null sau indefinit.');
    }
  }
}

export default Person;
