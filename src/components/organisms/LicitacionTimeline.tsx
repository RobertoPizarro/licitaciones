import React from 'react';
import { CheckCircle, XCircle, Send, Flag } from 'lucide-react';
import TimelineItem from '../molecules/TimelineItem';
import Button from '../atoms/Button';
import { LicitacionStatus } from '../../lib/types';
import './LicitacionTimeline.css';

interface LicitacionTimelineProps {
    currentStatus: LicitacionStatus;
    timestamps: Partial<Record<LicitacionStatus, string>>;
    onApprove: () => void;
    onReject: () => void;
    isApproved?: boolean;
    supervisorName?: string;
    isRejected?: boolean;
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
    timestamps,
    onApprove,
    onReject,
    isApproved = false,
    supervisorName = '',
    isRejected = false
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

    // Función helper para obtener el texto de estado
    const getStatusText = (stepStatus: LicitacionStatus): string | undefined => {
        const status = getStepStatus(stepStatus);
        if (status === 'active') return '---';
        if (status === 'pending') return 'Pendiente';
        return undefined; // Los completados no tienen statusText, solo timestamp
    };

    return (
        <div className="licitacion-timeline">
            <h3 className="timeline-header-title">Flujo del proceso de licitación</h3>

            {isRejected ? (
                <>
                    <TimelineItem
                        stepNumber={1}
                        title="Rechazada"
                        description="Solicitud rechaza por Mario Altamirano (Supervisor)"
                        status="completed"
                        timestamp={timestamps['BORRADOR']}
                        isRejected={true}
                    />

                    <TimelineItem
                        stepNumber={2}
                        title="Nueva"
                        description="Aprobada por supervisor"
                        status="pending"
                        statusText="Pendiente"
                    />
                </>
            ) : (
                <TimelineItem
                    stepNumber={1}
                    title="Borrador"
                    description={isApproved ? `Aprobada por ${supervisorName || 'Mario Altamirano (Supervisor)'}` : "Licitación a la espera de aprobación"}
                    status={getStepStatus('BORRADOR')}
                    timestamp={timestamps['BORRADOR']}
                    statusText={getStatusText('BORRADOR')}
                >
                    {currentStatus === 'BORRADOR' && !isApproved && (
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
            )}

            {!isRejected && (
                <TimelineItem
                    stepNumber={2}
                    title="Nueva"
                    description={isApproved ? "Invitando proveedores" : "Aprobada por supervisor"}
                    status={getStepStatus('NUEVA')}
                    timestamp={timestamps['NUEVA']}
                    statusText={getStatusText('NUEVA')}
                >
                    {currentStatus === 'NUEVA' && isApproved && (
                        <>
                            <Button variant="primary" size="sm" onClick={() => alert('Invitar proveedores - Por implementar')}>
                                <Send size={16} />
                                Invitar proveedores
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => alert('Finalizar invitación - Por implementar')}>
                                <Flag size={16} />
                                Finalizar invitación
                            </Button>
                        </>
                    )}
                </TimelineItem>
            )}

            <TimelineItem
                stepNumber={3}
                title="En invitación"
                description="Invitación enviada a los proveedores"
                status={getStepStatus('EN_INVITACION')}
                timestamp={timestamps['EN_INVITACION']}
                statusText={getStatusText('EN_INVITACION')}
            />

            <TimelineItem
                stepNumber={4}
                title="Con propuestas"
                description="Propuestas registradas"
                status={getStepStatus('CON_PROPUESTAS')}
                timestamp={timestamps['CON_PROPUESTAS']}
                statusText={getStatusText('CON_PROPUESTAS')}
            />

            <TimelineItem
                stepNumber={5}
                title="En evaluación - Comité Técnico"
                description="Validación de documentación y especificaciones técnicas"
                status={getStepStatus('EVALUACION_TECNICA')}
                timestamp={timestamps['EVALUACION_TECNICA']}
                statusText={getStatusText('EVALUACION_TECNICA')}
            />

            <TimelineItem
                stepNumber={6}
                title="En evaluación - Comité de Economía"
                description="Análisis de criterios económicos y financieros"
                status={getStepStatus('EVALUACION_ECONOMIA')}
                timestamp={timestamps['EVALUACION_ECONOMIA']}
                statusText={getStatusText('EVALUACION_ECONOMIA')}
            />

            <TimelineItem
                stepNumber={7}
                title="Adjudicado"
                description="Proveedor ganador seleccionado"
                status={getStepStatus('ADJUDICADO')}
                timestamp={timestamps['ADJUDICADO']}
                statusText={getStatusText('ADJUDICADO')}
            />

            <TimelineItem
                stepNumber={8}
                title="Con contrato"
                description="Contrato de adjudicación generado"
                status={getStepStatus('CON_CONTRATO')}
                timestamp={timestamps['CON_CONTRATO']}
                statusText={getStatusText('CON_CONTRATO')}
            />

            <TimelineItem
                stepNumber={9}
                title="Finalizada"
                description="Licitación finalizada"
                status={getStepStatus('FINALIZADA')}
                timestamp={timestamps['FINALIZADA']}
                statusText={getStatusText('FINALIZADA')}
            />
        </div>
    );
};

export default LicitacionTimeline;
