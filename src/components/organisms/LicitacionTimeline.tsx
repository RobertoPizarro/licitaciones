import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import TimelineItem from '../molecules/TimelineItem';
import Button from '../atoms/Button';
import { LicitacionStatus } from '../../lib/types';
import './LicitacionTimeline.css';

interface LicitacionTimelineProps {
    currentStatus: LicitacionStatus;
    onApprove: () => void;
    onReject: () => void;
}

// Mapeo del orden de los estados
const statusOrder: LicitacionStatus[] = [
    'BORRADOR',
    'NUEVA',
    'EN_INVITACION',
    'CON_PROPUESTAS',
    'EVALUACION_TECNICA',
    'EVALUACION_ECONOMIA',
    'ADJUDICADO',
    'CON_CONTRATO',
    'FINALIZADA'
];

const LicitacionTimeline: React.FC<LicitacionTimelineProps> = ({
    currentStatus,
    onApprove,
    onReject
}) => {
    // Determinar el índice del estado actual
    const currentIndex = statusOrder.indexOf(currentStatus);

    // Función helper para determinar el status de cada step
    const getStepStatus = (stepStatus: LicitacionStatus): 'active' | 'completed' | 'pending' => {
        const stepIndex = statusOrder.indexOf(stepStatus);
        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'active';
        return 'pending';
    };

    return (
        <div className="licitacion-timeline">
            <h3 className="timeline-header-title">Flujo del proceso de licitación</h3>

            <TimelineItem
                stepNumber={1}
                title="Borrador"
                description="Licitación a la espera de aprobación"
                status={getStepStatus('BORRADOR')}
            >
                {currentStatus === 'BORRADOR' && (
                    <>
                        <Button variant="primary" size="sm" onClick={onApprove}>
                            <CheckCircle size={16} />
                            Aprobar Solicitud
                        </Button>
                        <Button variant="secondary" size="sm" onClick={onReject}>
                            <XCircle size={16} />
                            Rechazar Solicitud
                        </Button>
                    </>
                )}
            </TimelineItem>

            <TimelineItem
                stepNumber={2}
                title="Nueva"
                description="Aprobada por supervisor"
                status={getStepStatus('NUEVA')}
            />

            <TimelineItem
                stepNumber={3}
                title="En invitación"
                description="Invitación enviada a los proveedores"
                status={getStepStatus('EN_INVITACION')}
            />

            <TimelineItem
                stepNumber={4}
                title="Con propuestas"
                description="Propuestas registradas"
                status={getStepStatus('CON_PROPUESTAS')}
            />

            <TimelineItem
                stepNumber={5}
                title="En evaluación - Comité Técnico"
                description="Validación de documentación y especificaciones técnicas"
                status={getStepStatus('EVALUACION_TECNICA')}
            />

            <TimelineItem
                stepNumber={6}
                title="En evaluación - Comité de Economía"
                description="Análisis de criterios económicos y financieros"
                status={getStepStatus('EVALUACION_ECONOMIA')}
            />

            <TimelineItem
                stepNumber={7}
                title="Adjudicado"
                description="Proveedor ganador seleccionado"
                status={getStepStatus('ADJUDICADO')}
            />

            <TimelineItem
                stepNumber={8}
                title="Con contrato"
                description="Contrato de adjudicación generado"
                status={getStepStatus('CON_CONTRATO')}
            />

            <TimelineItem
                stepNumber={9}
                title="Finalizada"
                description="Licitación finalizada"
                status={getStepStatus('FINALIZADA')}
            />
        </div>
    );
};

export default LicitacionTimeline;
