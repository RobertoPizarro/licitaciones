import React from 'react';
import TimelineItem from '../molecules/TimelineItem';
import Button from '../atoms/Button';
import { CheckCircle, XCircle, Send, Flag, PencilLine, ArrowRight, Settings } from 'lucide-react';
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
    proveedoresCount?: number;
    propuestasRegistradas?: number;
    propuestasAprobadasTecnicamente?: number;
    onRegistrarPropuesta?: () => void;
    onFinalizarInvitacion?: () => void;
    onFinalizarRegistro?: () => void;
    onEnviarEvaluacion?: () => void;
    onIniciarEvaluacionTecnica?: () => void;
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
    supervisorName,
    isRejected = false,
    proveedoresCount = 8,
    propuestasRegistradas = 3,
    propuestasAprobadasTecnicamente = 2,
    onRegistrarPropuesta,
    onFinalizarInvitacion,
    onFinalizarRegistro,
    onEnviarEvaluacion,
    onIniciarEvaluacionTecnica
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
                        title="Cancelada"
                        description="Solicitud cancelada por Mario Altamirano"
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
                    description={isApproved ? `Aprobada por ${supervisorName || 'Mario Altamirano'}` : "Licitación a la espera de aprobación"}
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
                                Cancelar Solicitud
                            </Button>
                        </>
                    )}
                </TimelineItem>
            )}

            {!isRejected && (
                <TimelineItem
                    stepNumber={2}
                    title="Nueva"
                    description={
                        currentStatus === 'EN_INVITACION' || timestamps['EN_INVITACION']
                            ? `Invitaciones enviadas a ${proveedoresCount} proveedores`
                            : isApproved
                                ? "Invitando proveedores"
                                : "Aprobada por supervisor"
                    }
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
                            <Button variant="secondary" size="sm" onClick={onFinalizarInvitacion}>
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
                description={
                    currentStatus === 'CON_PROPUESTAS' || getStepStatus('EN_INVITACION') === 'completed'
                        ? `${propuestasRegistradas} de ${proveedoresCount} propuestas registradas`
                        : "Registrando propuesta de los proveedores"
                }
                status={getStepStatus('EN_INVITACION')}
                timestamp={timestamps['EN_INVITACION']}
                statusText={getStatusText('EN_INVITACION')}
            >
                {currentStatus === 'EN_INVITACION' && (
                    <>
                        <Button variant="primary" size="sm" onClick={onRegistrarPropuesta}>
                            <PencilLine size={16} />
                            Registrar propuesta
                        </Button>
                        <Button variant="secondary" size="sm" onClick={onFinalizarRegistro}>
                            <ArrowRight size={16} />
                            Finalizar registro
                        </Button>
                    </>
                )}
            </TimelineItem>

            <TimelineItem
                stepNumber={4}
                title="Con propuestas"
                description={
                    currentStatus === 'EVALUACION_TECNICA' || getStepStatus('CON_PROPUESTAS') === 'completed'
                        ? "Enviado a evaluación"
                        : "Pendiente del envío a la evaluación"
                }
                status={getStepStatus('CON_PROPUESTAS')}
                timestamp={timestamps['CON_PROPUESTAS']}
                statusText={getStatusText('CON_PROPUESTAS')}
            >
                {currentStatus === 'CON_PROPUESTAS' && (
                    <Button variant="primary" size="sm" onClick={onEnviarEvaluacion}>
                        <Send size={16} />
                        Enviar a evaluación
                    </Button>
                )}
            </TimelineItem>

            <TimelineItem
                stepNumber={5}
                title="En evaluación - Comité Técnico"
                description={
                    currentStatus === 'EVALUACION_ECONOMIA' || getStepStatus('EVALUACION_TECNICA') === 'completed'
                        ? `${propuestasAprobadasTecnicamente} de ${propuestasRegistradas} propuestas aprobadas técnicamente`
                        : "Validando documentos y especificaciones técnicas"
                }
                status={getStepStatus('EVALUACION_TECNICA')}
                timestamp={timestamps['EVALUACION_TECNICA']}
                statusText={getStatusText('EVALUACION_TECNICA')}
            >
                {currentStatus === 'EVALUACION_TECNICA' && (
                    <Button variant="primary" size="sm" onClick={onIniciarEvaluacionTecnica}>
                        <Settings size={16} />
                        Iniciar evaluación
                    </Button>
                )}
            </TimelineItem>

            <TimelineItem
                stepNumber={6}
                title="En evaluación - Comité de Economía"
                description="Analizando los criterios económicos y financieros"
                status={getStepStatus('EVALUACION_ECONOMIA')}
                timestamp={timestamps['EVALUACION_ECONOMIA']}
                statusText={getStatusText('EVALUACION_ECONOMIA')}
            >
                {currentStatus === 'EVALUACION_ECONOMIA' && (
                    <Button variant="primary" size="sm" onClick={() => alert('Iniciar evaluación económica - Por implementar')}>
                        <Settings size={16} />
                        Iniciar evaluación
                    </Button>
                )}
            </TimelineItem>

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
