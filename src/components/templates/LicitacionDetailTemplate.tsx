import React, { useState } from 'react';
import { ArrowLeftFromLine } from 'lucide-react';
import PageHeader from '../molecules/PageHeader';
import Button from '../atoms/Button';
import LicitacionTimeline from '../organisms/LicitacionTimeline';
import LicitacionGeneralInfo from '../organisms/LicitacionGeneralInfo';
import LicitacionItemsTable from '../organisms/LicitacionItemsTable';
import LicitacionProposals from '../organisms/LicitacionProposals';
import LicitacionRequiredDocs from '../organisms/LicitacionRequiredDocs';
import ApprovalModal from '../organisms/ApprovalModal';
import CancellationModal from '../organisms/CancellationModal';
import { LicitacionStatus } from '../../lib/types';
import './LicitacionDetailTemplate.css';

interface LicitacionDetailTemplateProps {
    id: string;
    title: string;
    createdDate: string;
    buyer: string;
    supervisor: string;
    currentStatus: LicitacionStatus;
    timestamps: Partial<Record<LicitacionStatus, string>>;
    estimatedAmount: number;
    maxBudget: number;
    proveedoresCount?: number;
    propuestasRegistradas?: number;
    onApprove: () => void;
    onReject: () => void;
    onFinalizarInvitacion?: () => void;
    onFinalizarRegistro?: () => void;
}

const LicitacionDetailTemplate: React.FC<LicitacionDetailTemplateProps> = ({
    id,
    title,
    createdDate,
    buyer,
    supervisor,
    currentStatus,
    timestamps,
    estimatedAmount,
    maxBudget,
    proveedoresCount,
    propuestasRegistradas,
    onApprove,
    onReject,
    onFinalizarInvitacion,
    onFinalizarRegistro
}) => {
    // Modal states
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showCancellationModal, setShowCancellationModal] = useState(false);

    // Approval/Rejection states
    const [isApproved, setIsApproved] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const [supervisorName, setSupervisorName] = useState(supervisor);

    const handleApproveClick = () => {
        setShowApprovalModal(true);
    };

    const handleCancelClick = () => {
        setShowCancellationModal(true);
    };

    const handleApprovalConfirm = () => {
        setIsApproved(true);
        setSupervisorName('Mario Altamirano');
        setShowApprovalModal(false);
        onApprove();
    };

    const handleCancellationConfirm = () => {
        setIsRejected(true);
        setSupervisorName('Mario Altamirano');
        setShowCancellationModal(false);
        onReject();
    };

    const handleRegistrarPropuesta = () => {
        alert('Registrar propuesta - Por implementar');
    };

    return (
        <>
            <div className="licitacion-detail-header-wrapper">
                <PageHeader
                    title={title}
                    description={
                        <div className="header-metadata">
                            <span><strong>ID:</strong> {id}</span>
                            <span><strong>Fecha creación:</strong> {createdDate}</span>
                            <span><strong>Comprador:</strong> {buyer}</span>
                            <span><strong>Supervisor:</strong> {isApproved || isRejected ? supervisorName : supervisor}</span>
                        </div>
                    }
                />
                <Button variant="secondary" size="sm" onClick={() => window.history.back()}>
                    <ArrowLeftFromLine size={16} />
                    Volver
                </Button>
            </div>

            <div className="licitacion-detail-layout">
                <div className="licitacion-detail-left-col">
                    <LicitacionTimeline
                        currentStatus={currentStatus}
                        timestamps={timestamps}
                        onApprove={handleApproveClick}
                        onReject={handleCancelClick}
                        isApproved={isApproved}
                        supervisorName={supervisorName}
                        isRejected={isRejected}
                        proveedoresCount={proveedoresCount}
                        propuestasRegistradas={propuestasRegistradas}
                        onRegistrarPropuesta={handleRegistrarPropuesta}
                        onFinalizarInvitacion={onFinalizarInvitacion}
                        onFinalizarRegistro={onFinalizarRegistro}
                        onEnviarEvaluacion={() => alert('Enviar a evaluación - Por implementar')}
                    />
                </div>
                <div className="licitacion-detail-right-col">
                    <LicitacionGeneralInfo />
                    <LicitacionItemsTable />
                    <LicitacionProposals />
                    <LicitacionRequiredDocs />
                </div>
            </div>

            {/* Modals */}
            <ApprovalModal
                isOpen={showApprovalModal}
                onClose={() => setShowApprovalModal(false)}
                onConfirm={handleApprovalConfirm}
                licitacionId={id}
                buyer={buyer}
                estimatedAmount={estimatedAmount}
                maxBudget={maxBudget}
            />

            <CancellationModal
                isOpen={showCancellationModal}
                onClose={() => setShowCancellationModal(false)}
                onConfirm={handleCancellationConfirm}
                licitacionId={id}
                buyer={buyer}
                estimatedAmount={estimatedAmount}
                maxBudget={maxBudget}
            />
        </>
    );
};

export default LicitacionDetailTemplate;
