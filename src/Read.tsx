import React, { useState } from 'react';
import app from "./firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import PersonCard from "./PersonCard";
import PersonalData, { Employee } from "./Person";

const Read = () => {
    const [persons, setPersons] = useState([]);

    // const fetchPersonsData = () => {
    //     const db = getDatabase(app);
    //     const personsRef = ref(db, 'Persons/employee');
    //
    //     onValue(personsRef, (snapshot) => {
    //         const data = snapshot.val();
    //         if (data) {
    //             const dataArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    //             setPersons(dataArray);
    //         } else {
    //
    //             setPersons([]);
    //         }
    //     });
    // };

    // Apelarea funcției pentru citirea datelor la randarea componentei
    //fetchPersonsData();

    return (
        <div>
            {/* <div
                style={{
                    background: '#fff',
                    padding: 24,
                    minHeight: 280,
                    display: 'flex',
                    gap: '20px',
                    flexWrap: 'wrap',
                }}
            >
                {persons.map((person, index) => (
                    <PersonCard key={index} personId={person.id} personType="Employee" />
                ))}
            </div> */}
        </div>
    );
};

export default Read;
