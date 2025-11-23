import React, { useState } from 'react';
import LicitacionDetailTemplate from '../components/templates/LicitacionDetailTemplate';
import { LicitacionStatus } from '../lib/types';

const LicitacionDetailPage: React.FC = () => {
    // Estado de la licitación - Por ahora local, luego vendrá del backend
    const [currentStatus, setCurrentStatus] = useState<LicitacionStatus>('BORRADOR');

    // Timestamps de cuando se completó cada estado (simulado por ahora)
    const [timestamps, setTimestamps] = useState<Partial<Record<LicitacionStatus, string>>>({});

    const licitacionData = {
        id: "2025001",
        title: "Compra de equipos de cómputo",
        createdDate: "01/11/2025",
        buyer: "Juan Pérez",
        supervisor: "---",
        estimatedAmount: 39000,
        maxBudget: 45000
    };

    // Función helper para generar timestamp actual
    const getCurrentTimestamp = () => {
        const now = new Date();
        return now.toLocaleString('es-PE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Handlers para cambiar de estado
    const handleApprove = () => {
        // Guardar timestamp del estado actual antes de cambiar
        setTimestamps(prev => ({
            ...prev,
            [currentStatus]: getCurrentTimestamp()
        }));
        setCurrentStatus('NUEVA');
    };

    const handleReject = () => {
        // Guardar timestamp del estado actual antes de cambiar
        setTimestamps(prev => ({
            ...prev,
            [currentStatus]: getCurrentTimestamp()
        }));
        // La licitación rechazada se maneja en el template, no cambiamos el status aquí
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
            timestamps={timestamps}
            estimatedAmount={licitacionData.estimatedAmount}
            maxBudget={licitacionData.maxBudget}
            onApprove={handleApprove}
            onReject={handleReject}
        />
    );
};

export default LicitacionDetailPage;
