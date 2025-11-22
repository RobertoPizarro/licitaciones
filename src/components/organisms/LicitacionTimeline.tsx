import React from 'react';
import TimelineItem from '../molecules/TimelineItem';
import Button from '../atoms/Button';
import './LicitacionTimeline.css';

const LicitacionTimeline: React.FC = () => {
    return (
        <div className="licitacion-timeline">
            <h3 className="timeline-header-title">Flujo del proceso de licitación</h3>

            <TimelineItem
                stepNumber={1}
                title="Borrador"
                description="Licitación a la espera de aprobación"
                status="active"
            >
                <Button variant="primary" size="sm">Aprobar Solicitud</Button>
                <Button variant="danger-outline" size="sm">Rechazar Solicitud</Button>
            </TimelineItem>

            <TimelineItem
                stepNumber={2}
                title="Nueva"
                description="Aprobada por supervisor"
                status="pending"
            />

            <TimelineItem
                stepNumber={3}
                title="En invitación"
                description="Invitación enviada a los proveedores"
                status="pending"
            />

            <TimelineItem
                stepNumber={4}
                title="Con propuestas"
                description="Propuestas registradas"
                status="pending"
            />

            <TimelineItem
                stepNumber={5}
                title="En evaluación - Comité Técnico"
                description="Validación de documentación y especificaciones técnicas"
                status="pending"
            />

            <TimelineItem
                stepNumber={6}
                title="En evaluación - Comité de Economía"
                description="Análisis de criterios económicos y financieros"
                status="pending"
            />

            <TimelineItem
                stepNumber={7}
                title="Adjudicado"
                description="Proveedor ganador seleccionado"
                status="pending"
            />

            <TimelineItem
                stepNumber={8}
                title="Con contrato"
                description="Contrato de adjudicación generado"
                status="pending"
            />

            <TimelineItem
                stepNumber={9}
                title="Finalizada"
                description="Licitación finalizada"
                status="pending"
                isLast={true}
            />
        </div>
    );
};

export default LicitacionTimeline;
