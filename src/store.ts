import { makeAutoObservable, action, runInAction } from 'mobx';
import { getDatabase, ref, onValue, set, push, remove } from 'firebase/database';
import app from './firebase';
import { PersonalData, Employee } from './Person';

class Store {
  personalData: PersonalData[] = [];
  employeeData: Employee[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  @action
  fetchPersonalData() {
    this.setLoading(true);
    setTimeout(() => {
      const dbRef = ref(getDatabase(app), 'Persons/person');
      onValue(dbRef, (snapshot) => {
        const dataFromSnapshot = snapshot.val();
        runInAction(() => {
          if (dataFromSnapshot) {
            this.personalData = Object.entries(dataFromSnapshot).map(([key, value]) => ({
              id: key,
              ...(value as any),
            }));
          } else {
            console.log('No data available');
          }
          this.setLoading(false);
        });
      });
    }, 2000);
  }

  @action
  fetchEmployeeData() {
    this.setLoading(true);
    setTimeout(() => {
      const dbRef = ref(getDatabase(app), 'Persons/employee');
      onValue(dbRef, (snapshot) => {
        const dataFromSnapshot = snapshot.val();
        runInAction(() => {
          if (dataFromSnapshot) {
            this.employeeData = Object.entries(dataFromSnapshot).map(([key, value]) => ({
              id: key,
              ...(value as any),
            }));
          } else {
            console.log('No data available');
          }
          this.setLoading(false);
        });
      });
    }, 2000);
  }

  @action
  addPersonalData(data: PersonalData) {
    const { id, ...dataWithoutId } = data;
    const db = getDatabase(app);
    const dbRef = ref(db, "Persons/person");

    push(dbRef, dataWithoutId)
      .then(() => {
        alert("Datele au fost salvate cu succes!");
      })
      .catch((error) => {
        alert("Eroare la salvarea datelor: " + error.message);
      });
  }

  @action
  updatePersonalData(data: PersonalData) {
    const db = getDatabase(app);
    const dbRef = ref(db, `Persons/person/${data.id}`);

    set(dbRef, data)
      .then(() => {
        alert("Datele au fost actualizate cu succes!");
      })
      .catch((error) => {
        alert("Eroare la actualizarea datelor: " + error.message);
      });
  }

  @action
  deletePersonalData(id: string, type: 'Person' | 'Employee') {
    const db = getDatabase(app);
    const dbRef = ref(db, `Persons/${type.toLowerCase()}/${id}`);

    remove(dbRef)
      .then(() => {
        alert("Datele au fost șterse cu succes!");
        runInAction(() => {
          if (type === 'Person') {
            this.personalData = this.personalData.filter(person => person.id !== id);
          } else if (type === 'Employee') {
            this.employeeData = this.employeeData.filter(employee => employee.id !== id);
          }
        });
      })
      .catch((error) => {
        alert("Eroare la ștergerea datelor: " + error.message);
      });
  }
}

const store = new Store();
export default store;
