// PersonalStore.ts
import { observable, action } from 'mobx';

class PersonalStore {
  @observable personalData = {
    name: 'Stici Pavel',
    age: 21,
    grupa: 'CR-221'
  };

  constructor() {
    this.updatePersonalData = this.updatePersonalData.bind(this);
  }


  @action updatePersonalData(newData: any) {
    if (this.personalData) {
      this.personalData = newData;
      console.log(this.personalData);
    } else {
      console.error('Error: newData is null or undefined.');
    }
  }
}

const person = new PersonalStore();
export default person;
