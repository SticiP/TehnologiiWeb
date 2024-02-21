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
            <Descriptions title="Informații student">
                {person.personalData.map(item => (
                    <Descriptions.Item key={item.key} label={item.label}>
                    {item.children}
                    </Descriptions.Item>
                ))}
            </Descriptions>
            <EditModal />
        </Card>
    )
});

export default PersonCard;
