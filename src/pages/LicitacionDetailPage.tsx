import React, { useState } from 'react';
import LicitacionDetailTemplate from '../components/templates/LicitacionDetailTemplate';
import { LicitacionStatus } from '../lib/types';

const LicitacionDetailPage: React.FC = () => {
    // Estado de la licitación - Por ahora local, luego vendrá del backend
    const [currentStatus, setCurrentStatus] = useState<LicitacionStatus>('BORRADOR');

    const licitacionData = {
        id: "2025001",
        title: "Compra de equipos de cómputo",
        createdDate: "01/11/2025",
        buyer: "Juan Pérez",
        supervisor: "---"
    };

    // Handlers para cambiar de estado
    const handleApprove = () => {
        setCurrentStatus('NUEVA');
    };

    const handleReject = () => {
        // Por ahora solo log, luego implementar lógica
        console.log('Solicitud rechazada');
    };

    return (
        <LicitacionDetailTemplate
            id={licitacionData.id}
            title={licitacionData.title}
            createdDate={licitacionData.createdDate}
            buyer={licitacionData.buyer}
            supervisor={licitacionData.supervisor}
            currentStatus={currentStatus}
            onApprove={handleApprove}
            onReject={handleReject}
        />
    );
};

export default LicitacionDetailPage;
