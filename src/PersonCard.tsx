// src/PersonCard.tsx
import React from 'react';
import { observer } from 'mobx-react';
import person  from './Person';
import { Card, Descriptions } from 'antd';
import EditModal from './PersonModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const PersonCard = observer(() => {
    return (
        <Card size="small">
        </Card>
    )
});

export default PersonCard;
