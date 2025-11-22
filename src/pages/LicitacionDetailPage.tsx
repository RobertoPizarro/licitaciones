import React from 'react';
import LicitacionDetailTemplate from '../components/templates/LicitacionDetailTemplate';

const LicitacionDetailPage: React.FC = () => {
    // Mock Data matching the image
    const licitacionData = {
        id: "2025001",
        title: "Compra de equipos de cómputo",
        createdDate: "01/11/2025",
        buyer: "Juan Pérez",
        supervisor: "---"
    };

    return (
        <LicitacionDetailTemplate
            id={licitacionData.id}
            title={licitacionData.title}
            createdDate={licitacionData.createdDate}
            buyer={licitacionData.buyer}
            supervisor={licitacionData.supervisor}
        />
    );
};

export default LicitacionDetailPage;
