import React from 'react';
import { Button } from 'antd';
import { getDatabase, ref, set } from 'firebase/database';
import app from './firebase';

const Write: React.FC = () => {
  const handleSaveUserDetails = () => {
    const db = getDatabase(app);
    const userRef = ref(db, 'users/pavel_stici@iis_utm_md'); // Firebase does not support dots in keys, replacing dots with underscores
    set(userRef, {
      email: 'pavel.stici@iis.utm.md',
      nume: 'Pavel Stici'
    })
      .then(() => {
        alert('User details saved successfully!');
      })
      .catch((error) => {
        alert('Error saving user details: ' + error.message);
      });
  };

  return (
    <div>
      <Button type="primary" onClick={handleSaveUserDetails}>
        Save User Details
      </Button>
    </div>
  );
};

export default Write;
