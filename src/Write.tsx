import React, { useState } from 'react';
import app from "./firebase";
import { getDatabase, ref, set, push } from "firebase/database";
import PersonalData, {Employee} from "./Person";

const Write = () => {

    const personsData: PersonalData  = {
        id : '1',
        numePrenume : 'Melnic Andrian',
        dataNasterii : '2022-07-24',
        varsta : 20,
        sex : 'Masculin',
        email : 'melnic.andrian@my.erau.edu',
        telefon : '0721234567',
        adresa : 'Bucuresti Str. Nr. 1 Sector 1',
    };

    const saveData = async (): Promise<void> => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "Persons/person"));
        set(newDocRef, personsData).then( () => {
            alert("data saved successfully");
        }).catch((error) => {
            alert("error: " + error.message);
        });
    };

    return (
        <div>
            <h1>WRITE/HOMEPAGE</h1>
            <button onClick={saveData}>SAVE DATA</button>
        </div>
    );
}

export default Write;
