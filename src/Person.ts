
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
