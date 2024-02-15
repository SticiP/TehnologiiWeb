// PersonalStore.ts
import {action, makeAutoObservable } from 'mobx';

class Person {
  personalData = {
    name: 'Stici Pavel',
    age: 21,
    grupa: 'CR-221'
  };

  constructor() {
    makeAutoObservable(this);
    this.updatePersonalData = this.updatePersonalData.bind(this);
  }

  @action updatePersonalData(newData: {
    name: string;
    age: number;
    grupa: string;
  }) {
    if (newData) {
      this.personalData = newData;
      console.log(this.personalData);
    } else {
      console.error('Error: newData is null or undefined.');
    }
  }
}

const person = new Person();
export default person;
