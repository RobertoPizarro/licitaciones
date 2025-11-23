import React from 'react';
import Card from '../atoms/Card';
import CardHeader from '../atoms/CardHeader';
import CardBody from '../atoms/CardBody';
import ReadOnlyField from '../molecules/ReadOnlyField';
import './LicitacionGeneralInfo.css';

const LicitacionGeneralInfo: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <h2>Información General</h2>
            </CardHeader>
            <CardBody>
                <div className="general-info-grid">
                    <ReadOnlyField label="Presupuesto Máximo" value="S/. 45,000.00" />
                    <ReadOnlyField label="Solicitud de Origen" value="N° 2025123" />
                    <ReadOnlyField label="Fecha límite para recibir propuestas" value="10 Nov 2025" />
                    <ReadOnlyField label="Comprador" value="Juan Pérez" />
                </div>
            </CardBody>
        </Card>
    );
};

export default LicitacionGeneralInfo;
